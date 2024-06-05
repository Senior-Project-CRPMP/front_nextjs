'use client'
import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
type Notification = {
    id: number;
    title: string;
    message: string;
    dateCreated: string;
    isRead: boolean;
  };

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        // Fetch initial notifications
        fetch(`${apiBaseUrl}/api/Notification`)
            .then(response => response.json())
            .then(data => setNotifications(data));

        // Setup SignalR connection
        const connection = new HubConnectionBuilder()
            .withUrl(`${apiBaseUrl}/notification`)
            .build();

        connection.on('ReceiveNotification', notification => {
            setNotifications(prev => [notification, ...prev]);
        });

        connection.start().catch(err => console.error(err));

        return () => {
            connection.stop().catch(err => console.error(err));
        };
    }, []);

    return (
        <div>
            <h2 className="text-2xl mb-4">Notifications</h2>
            {notifications.map(notification => (
                <div key={notification.id} className={`p-4 mb-4 border ${notification.isRead ? 'bg-gray-100' : 'bg-white'}`}>
                    <h4 className="font-bold">{notification.title}</h4>
                    <p>{notification.message}</p>
                    <small>{new Date(notification.dateCreated).toLocaleString()}</small>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
