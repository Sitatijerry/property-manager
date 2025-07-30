// src/components/DashboardStats.jsx
import React from "react";
import { FaBuilding, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const statCards = [
  {
    title: "Total Properties",
    value: 18, // This will be dynamic later
    icon: <FaBuilding className="text-white text-xl" />,
    bg: "bg-blue-500",
  },
  {
    title: "Active Listings",
    value: 12,
    icon: <FaCheckCircle className="text-white text-xl" />,
    bg: "bg-green-500",
  },
  {
    title: "Reservations",
    value: 43,
    icon: <FaClipboardList className="text-white text-xl" />,
    bg: "bg-yellow-500",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow flex items-center p-5 border border-gray-200"
        >
          <div className={`p-3 rounded-full ${card.bg} mr-4`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
