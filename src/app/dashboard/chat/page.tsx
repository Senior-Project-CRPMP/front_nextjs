"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

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

const Chat = () => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const msgToSend= {
    senderUserId: userId,
    content: message
  };
  const [currentRoom, setCurrentRoom] = useState<number | null>(null);
  const [users, setUser] = useState<User[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  
    const fetchUser = async (userid: string) => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Account/user/${userid}`);
        const data = await res.json();
        console.log(data)

        setUser(prevUsers => [...prevUsers, data]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    const response = await fetch(`${apiBaseUrl}/api/ChatRoom/user/${userId}/chatrooms`);
    const data: ChatRoom[] = await response.json();
    setChatRooms(data);
    console.log(data)
    console.log(chatRooms);
  };

  const joinChatRoom = async (roomId: number) => {
      setCurrentRoom(roomId);
      fetchMessages(roomId);
  };


  const fetchMessages = async (roomId: number) => {
    const response = await fetch(
      `${apiBaseUrl}/api/ChatRoom/chatroom/${roomId}/messages`
    );
    const data: ChatMessage[] = await response.json();
    setMessages(data);
    console.log(data)
    console.log(messages)
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/ChatRoom/chatroom/${currentRoom}/messages/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msgToSend),
        }
      );

      if (response.ok) {
        console.log("Item created successfully");
        // Optionally, you can redirect the user or update the UI here
      } else {
        console.error("Failed to create item:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
    
  };

  useEffect(() => {
    // Fetch user data for each unique userId
    messages.forEach(async (msg) => {
      if (!users.find(user => user.id === msg.userId)) {
        // Fetch user data if it doesn't exist in the users array
        await fetchUser(msg.userId);
      }
    });
  }, [messages, users]);

  return (
    <div>
      {!chatRooms || chatRooms.length === 0 ? (
        //<div>
        // <h2>Start a Chat</h2>
        // <Link href="/createChatRoom">
        // <button>Now</button>
        // </Link>
        // </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-52 m-10">
          <div className="p-8 text-center">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Start A New Conversation{" "}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              New chat here
            </p>
            <Link
              href="/dashboard/createChatRoom"
              className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </div>
      ) : (
        <div className="flex space-x-4">
          <div className="h-screen w-1/5 p-4 bg-gray-200">
            <h2 className="border-b-2 border-black">Chat Rooms</h2>

            <ul>
              {chatRooms.map((room) => (
                <li className="" key={room.chatRoomId}>
                  <button
                    className="w-full p-1 m-1 bg-white"
                    onClick={() => joinChatRoom(room.chatRoomId)}
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
          {!currentRoom ? (
            <div className="h-screen w-4/5 p-4 bg-gray-300"></div>
          ) : (
            <div className="h-screen w-4/5 p-4 bg-gray-300">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="bg-gray-200 flex-1 ">
                    <div className="px-4 py-2">
                      <div className="flex items-center mb-2">
                        <div className="font-medium">{users.find(user => user.id === msg.userId)?.firstName}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gray-100 px-4 py-2">
                <div className="flex items-center">
                  <input
                    className="w-full border rounded-full py-2 px-4 mr-2"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
