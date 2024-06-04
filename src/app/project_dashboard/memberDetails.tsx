
import React from 'react';

interface MemberDetailsProps {
  member: { name: string; role: string; email: string; };
  onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="text-red-500 font-bold">Close</button>
        <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
        <p className="text-gray-700 mb-1">Role: {member.role}</p>
        <p className="text-gray-700 mb-1">Email: {member.email}</p>
      </div>
    </div>
  );
};

export default MemberDetails;
