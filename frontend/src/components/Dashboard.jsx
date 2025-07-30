// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const cards = [
    { title: 'Total Properties', value: 12 },
    { title: 'Active Tenants', value: 45 },
    { title: 'Pending Requests', value: 8 },
    { title: 'Monthly Income', value: 'KES 240,000' },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Manager Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border-l-4 border-green-600"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h3 className="text-xl font-semibold text-green-700 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
