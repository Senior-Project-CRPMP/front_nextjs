import { useState, FormEvent } from 'react';

interface User {
  id: number;
  name: string;
}

interface Notification {
  userId: number;
  message: string;
  isRead: boolean;
  dateCreated: string;
}

export default function NotificationForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const usersRes = await fetch(`${apiBaseUrl}/api/Account/users`);
      const users: User[] = await usersRes.json();

      const notifications = users.map(user => ({
        userId: user.id,
        message,
        isRead: false,
        dateCreated: new Date().toISOString(),
      }));

      for (const notification of notifications) {
        await fetch(`${apiBaseUrl}/api/Notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notification),
        });
      }

      setSuccessMessage('Notifications sent successfully!');
    } catch (error) {
      console.error('Error creating notifications:', error);
      setSuccessMessage('Failed to send notifications.');
    }

    setLoading(false);
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Notification Content
          </label>
          <textarea
            id="content"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{successMessage}</p>}
    </div>
  );
}
