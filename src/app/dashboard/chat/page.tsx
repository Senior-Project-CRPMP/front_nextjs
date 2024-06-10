"use client";
import React, { Component } from "react";
import Link from "next/link";

type ChatMessage = {
  id: number;
  userId: string;
  content: string;
  timestamp: string;
  chatRoomId: number;
};

type ChatRoom = {
  chatRoomId: number;
  name: string;
  createdAt: Date;
  participants: { userId: string }[];
  messages: ChatMessage[];
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type State = {
  chatRooms: ChatRoom[];
  messages: ChatMessage[];
  message: string;
  currentRoom: number | null;
  users: User[];
  searchQuery: string;
};

class Chat extends Component<{}, State> {
  intervalId: NodeJS.Timeout | null = null;
  userId: string | null = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;
  apiBaseUrl: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

  constructor(props: {}) {
    super(props);
    this.state = {
      chatRooms: [],
      messages: [],
      message: "",
      currentRoom: null,
      users: [],
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchChatRooms();
    this.intervalId = setInterval(this.fetchChatRooms, 1000); // Refresh every second
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchChatRooms = async () => {
    const response = await fetch(`${this.apiBaseUrl}/api/ChatRoom/user/${this.userId}/chatrooms`);
    const data: ChatRoom[] = await response.json();
    this.setState({ chatRooms: data });
  };

  joinChatRoom = async (roomId: number) => {
    this.setState({ currentRoom: roomId });
    this.fetchMessages(roomId);
  };

  fetchMessages = async (roomId: number) => {
    const response = await fetch(`${this.apiBaseUrl}/api/ChatRoom/chatroom/${roomId}/messages`);
    const data: ChatMessage[] = await response.json();
    this.setState({ messages: data });

    // Fetch user data for each unique userId
    data.forEach(async (msg) => {
      if (!this.state.users.find(user => user.id === msg.userId)) {
        await this.fetchUser(msg.userId);
      }
    });
  };

  fetchUser = async (userid: string) => {
    try {
      const res = await fetch(`${this.apiBaseUrl}/api/Account/user/${userid}`);
      const data = await res.json();
      this.setState(prevState => ({
        users: [...prevState.users, data]
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  sendMessage = async () => {
    const { currentRoom, message } = this.state;
    const msgToSend = {
      senderUserId: this.userId,
      content: message,
    };

    try {
      const response = await fetch(
        `${this.apiBaseUrl}/api/ChatRoom/chatroom/${currentRoom}/messages/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msgToSend),
        }
      );

      if (response.ok) {
        console.log("Message sent successfully");
        this.fetchMessages(currentRoom!); // Refresh messages after sending a new one
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.target.value });
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    this.fetchChatRooms(); // Optionally trigger fetch if you want to re-fetch chat rooms
  };

  render() {
    const { chatRooms, messages, message, currentRoom, users, searchQuery } = this.state;

    const filteredChatRooms = chatRooms.filter(room =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="flex h-screen">
      <div className="h-full w-1/4 p-4 bg-blue-100">
        <h2 className="border-b-2 border-black font-bold">Chats</h2>
        {/* <div className="flex mb-2">
            <input
              className="w-full p-2 border rounded-l-full"
              type="text"
              placeholder="Search or start a new chat"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2 rounded-r-full"
              onClick={this.handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zm-5.44 1.1a5.5 5.5 0 1 1 0-7.778 5.5 5.5 0 0 1 0 7.778z"/>
              </svg>
            </button>
          </div> */}
          <ul>
            {filteredChatRooms.map((room) => (
              <li className="" key={room.chatRoomId}>
                <button
                  className="w-full p-1 m-1 bg-white"
                  onClick={() => this.joinChatRoom(room.chatRoomId)}
                >
                  {room.name}
                </button>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard/createChatRoom"
            className="inline-flex items-center my-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="#fffafa"
                  d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                />
              </g>
            </svg>
          </Link>
        </div>
        <div className="flex flex-col w-4/5 bg-blue-50 relative">
          {!currentRoom ? (
              <div className="flex-1 flex items-center justify-center text-2xl text-gray-500">
               Select a chat to start 
               <svg xmlns="http://www.w3.org/2000/svg" width="1.24em" height="1.24em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4C9.373 4 4 9.373 4 16c0 2.165.572 4.193 1.573 5.945a1 1 0 0 1 .094.77l-1.439 5.059l5.061-1.44a1 1 0 0 1 .77.094A11.94 11.94 0 0 0 16 28c6.628 0 12-5.373 12-12S22.628 4 16 4M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14c-2.368 0-4.602-.589-6.56-1.629l-5.528 1.572A1.5 1.5 0 0 1 2.06 28.09l1.572-5.527A13.94 13.94 0 0 1 2 16m8-3a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H11a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2z"/></svg> 
              </div>        
              ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    <div className="bg-blue-50 flex-1">
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="font-medium">
                            {users.find(user => user.id === msg.userId)?.firstName}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-100 px-4 py-2">
                <div className="flex items-center">
                  <input
                    className="w-full border rounded-full py-2 px-4 mr-2"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={this.handleInputChange}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                    onClick={this.sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
