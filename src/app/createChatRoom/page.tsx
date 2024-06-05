'use client'

import { useState, ChangeEvent, FormEvent } from 'react';

export default function CreateChatRoom() {
  const [roomName, setRoomName] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const participants = ['Participant 1', 'Participant 2', 'Participant 3']; // Example participants

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/api/Chat/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName, participants: selectedParticipants }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setMessage('Chat room created successfully.');
      setRoomName('');
      setSelectedParticipants([]);
    } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(`Error: ${error.message}`);
        } else {
          setMessage('An unexpected error occurred.');
        }
      }
  };

  const handleParticipantChange = (event : ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedParticipants(selectedOptions);
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
          value={selectedParticipants}
          onChange={handleParticipantChange}
          multiple
          required
        >
          {participants.map((participant, index) => (
            <option key={index} value={participant}>
              {participant}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Create Chat Room</button>
      </form>
      {message && <div>{message}</div>}
    </div>
    </div>
    </div>
    </div>
  );
}
