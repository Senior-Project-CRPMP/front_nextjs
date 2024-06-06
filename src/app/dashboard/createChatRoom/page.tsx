"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface Participant {
  value: string;
  label: string;
}

export default function CreateChatRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [message, setMessage] = useState<string>("");
  const participants: Participant[] = [
    { value: "Participant 1", label: "Participant 1" },
    { value: "Participant 2", label: "Participant 2" },
    { value: "Participant 3", label: "Participant 3" },
  ];
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7174/api/Chat/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          participants: selectedParticipants,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setMessage("Chat room created successfully.");
      setRoomName("");
      setSelectedParticipants([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const handleParticipantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedParticipants(selectedOptions);
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="max-w-xl w-full bg-white shadow-md rounded-md p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">Create ChatRoom</h1>
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <label className="block font-medium mb-2" htmlFor="roomName">
                Chat Room Name:
              </label>
              <input
                type="text"
                id="roomName"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                required
              />
              <div className="flex mb-2 mt-3 relative">
                <input
                  type="text"
                  id="search"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  placeholder="Search Participants"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
              <select
                id="participants"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={selectedParticipants}
                onChange={handleParticipantChange}
                multiple
                required
              >
                {filteredParticipants.map((participant, index) => (
                  <option key={index} value={participant.value}>
                    {participant.label}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
                type="submit"
              >
                Create Chat Room
              </button>
            </form>
            {message && <div>{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
