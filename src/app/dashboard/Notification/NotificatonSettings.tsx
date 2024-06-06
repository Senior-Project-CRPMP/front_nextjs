// pages/settings.tsx
import React, { useState } from 'react';

const NotificationSettings: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true); // Set to true to display the settings panel by default
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [schedule, setSchedule] = useState({ from: { hour: '', minute: '' }, to: { hour: '', minute: '' } });
  const [daysOff, setDaysOff] = useState<string[]>([]);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const toggleDayOff = (day: string) => {
    if (daysOff.includes(day)) {
      setDaysOff(daysOff.filter(d => d !== day));
    } else {
      setDaysOff([...daysOff, day]);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div >
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
            <button onClick={handlePopupToggle} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-4">Notification Settings</h1>

            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={doNotDisturb}
                  onChange={() => setDoNotDisturb(!doNotDisturb)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">Do not disturb</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Do not notify me from:</label>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Hour</label>
                  <select
                    value={schedule.from.hour}
                    onChange={(e) => setSchedule({ ...schedule, from: { ...schedule.from, hour: e.target.value } })}
                    className="form-select mt-1 block w-full"
                  >
                    <option value="">HH</option>
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Minute</label>
                  <select
                    value={schedule.from.minute}
                    onChange={(e) => setSchedule({ ...schedule, from: { ...schedule.from, minute: e.target.value } })}
                    className="form-select mt-1 block w-full"
                  >
                    <option value="">MM</option>
                    {minutes.map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Do not notify me to:</label>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Hour</label>
                  <select
                    value={schedule.to.hour}
                    onChange={(e) => setSchedule({ ...schedule, to: { ...schedule.to, hour: e.target.value } })}
                    className="form-select mt-1 block w-full"
                  >
                    <option value="">HH</option>
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Minute</label>
                  <select
                    value={schedule.to.minute}
                    onChange={(e) => setSchedule({ ...schedule, to: { ...schedule.to, minute: e.target.value } })}
                    className="form-select mt-1 block w-full"
                  >
                    <option value="">MM</option>
                    {minutes.map(minute => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Do not disturb me on my days off:</label>
              <div className="grid grid-cols-2 gap-4">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={daysOff.includes(day)}
                      onChange={() => toggleDayOff(day)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;
