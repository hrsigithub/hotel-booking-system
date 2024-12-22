import { useState } from 'react';

const Reservation = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [numNights, setNumNights] = useState(1);
  const [roomType, setRoomType] = useState('single');
  const [numPeople, setNumPeople] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkInDate,
        numNights,
        roomType,
        numPeople,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`Reservation successful! Reservation ID: ${data.reservationId}`);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  const today = new Date().toISOString().split('T')[0]; // 今日の日付を取得

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Reservation Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">チェックイン:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">泊数:</label>
          <input
            type="number"
            value={numNights}
            onChange={(e) => setNumNights(Number(e.target.value))}
            min={1}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">部屋:</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">人数:</label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(Number(e.target.value))}
            min={1}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Reservation
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default Reservation;
