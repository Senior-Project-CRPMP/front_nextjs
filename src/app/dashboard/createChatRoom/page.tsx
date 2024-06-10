'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function CreateChatRoom() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('loggeduserid') : null;
  const [roomName, setRoomName] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<string[]>([userId || ""]);
  const [message, setMessage] = useState('');
  const [participants, setParticipants] = useState<User[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const route = useRouter()


  useEffect(() => {
    const getParticipants = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Account/users`);
        const data: User[] = await res.json();
        console.log(data);
  
        // Filter out the user with the specific userId
        const filteredParticipants = data.filter(user => user.id !== userId);
  
        setParticipants(filteredParticipants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    
    getParticipants();
  }, []);
  

  const Participants = () => {
    
    return (
      <>
      {participants.map((participant) => (
        <option key={participant.id} value={participant.id} onClick={(event)=>handleAddParticipant(((event.target as HTMLOptionElement).value))}>
          {participant.firstName} {participant.lastName}
        </option>
      ))}
    </>
    )
  };

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {

      const response = await fetch(`${apiBaseUrl}/api/ChatRoom/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName, participantUserIds: selectedParticipant}),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setMessage('Chat room created successfully.');
      setRoomName('');
      setSelectedParticipant([userId || ""]);
    } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(`Error: ${error.message}`);
        } else {
          setMessage('An unexpected error occurred.');
        }
      }
  };

  useEffect(()=>{
    console.log(selectedParticipant)
  }, [])

  const handleAddParticipant = (newParticipant: string) => {
    setSelectedParticipant(prevParticipants => [...prevParticipants, newParticipant]);
    console.log(selectedParticipant)
};

  const handleParticipantChange = (event : ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map((option: HTMLOptionElement) => option.value);
    setSelectedParticipant(prevParticipants => [...prevParticipants, selectedOptions[0]]);

  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-md p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">Create ChatRoom</h1>
          <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2" htmlFor="roomName">Chat Room Name:</label>
        <input
          type="text"
          id="roomName"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          required
        />
        <label className="block font-medium mb-2" htmlFor="participants">Participants:</label>
        <select
          id="participants"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={selectedParticipant}
          onChange={handleParticipantChange}
          multiple
          required
        >
          <Participants/>
        </select>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>{handleSubmit; route.push('/dashboard/chat')}}>Create Chat Room</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>{route.push('/dashboard/chat')}}>Cancel</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}
