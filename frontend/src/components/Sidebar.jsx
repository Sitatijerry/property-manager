// src/components/Sidebar.jsx
import React from 'react';
import { Home, Building, Users, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
  { name: 'Properties', icon: <Building size={20} />, path: '/properties' },
  { name: 'Users', icon: <Users size={20} />, path: '/users' },
  // { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-green-50 w-64 h-screen p-6 shadow-md">
      <div className="text-xl font-bold text-green-700 mb-10">Manager Panel</div>
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-green-100 transition ${
              location.pathname === item.path ? 'bg-green-100 text-green-800 font-semibold' : 'text-gray-700'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
