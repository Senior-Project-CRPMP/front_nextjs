'use client';
import React, { useState, useEffect} from 'react';
import Link from "next/link";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

type ChatMessage = {
  id: number;
  userId: string;
  message: string;
  timestamp: string;
  chatRoomId: number;
};

type ChatRoom = {
  id: number;
  name: string;
  participants: { userId: string }[];
  messages: ChatMessage[];
};

const Chat = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    const response = await fetch('https://localhost:7174/api/Chat/rooms');
    const data: ChatRoom[] = await response.json();
    setChatRooms(data);
    console.log(chatRooms)
  };

  const joinChatRoom = async (roomId: string) => {
    try {
      if (connection) {
        await connection.stop();
      }

      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7174/Chat', { withCredentials: true })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      newConnection.on('ReceiveMessage', (message: ChatMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });

      await newConnection.start();
      await newConnection.invoke('JoinRoom', roomId);

      setConnection(newConnection);
      setCurrentRoom(roomId);
      fetchMessages(roomId);
    } catch (e) {
      console.error('Connection failed:', e);
    }
  };

  const fetchMessages = async (roomId: string) => {
    const response = await fetch(`https://localhost:7174/api/Chat/rooms/${roomId}/messages`);
    const data: ChatMessage[] = await response.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!connection || !message.trim() || !currentRoom) return;

    try {
      await connection.send('SendMessage', currentRoom,'Melat', message);
      setMessage('');
    } catch (error) {
      console.error('Send message failed:', error);
    }
  };

  return (
    <div>
      {(!chatRooms || chatRooms.length === 0) ?
         (
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
            href="/createChatRoom"
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
          <h2 className='border-b-2 border-black'>Chat Rooms</h2>
          
          <ul>
            {chatRooms.map((room) => (
              <li className="" key={room.id}>
                <button className="w-full p-1 m-1 bg-white" onClick={() => joinChatRoom(room.id.toString())}>
                  {room.name}
                </button>
              </li>
            ))}
          </ul>
          <Link
            href="/createChatRoom"
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
        <div className="h-screen w-4/5 p-4 bg-gray-300">
        </div>
      ) : (
          <div className="h-screen w-4/5 p-4 bg-gray-300">
          {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="bg-gray-200 flex-1 ">
                <div className="px-4 py-2">
                    <div className="flex items-center mb-2">
                        <div className="font-medium">{msg.userId}</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                    {msg.message}
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
                    onChange={e => setMessage(e.target.value)}
                    />
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                    onClick={sendMessage}
                    >
                Send
              </button>
                </div>
            </div>
            </div>)}
        </div>
      )}
    </div>
  );
};

export default Chat;
