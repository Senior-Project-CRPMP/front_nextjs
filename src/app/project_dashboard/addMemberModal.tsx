// components/AddMemberModal.tsx
import React, { useState } from 'react';

interface AddMemberModalProps {
  onAdd: (member: { name: string; role: string; email: string; }) => void;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onAdd, onClose }) => {
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-100 overflow-y-auto">
        <button onClick={onClose} className="text-red-500 font-bold mb-2">Close</button>
        <h2 className="text-xl font-semibold mb-2">Add New Member</h2>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newMember.name}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newMember.role}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newMember.email}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Add Member
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
