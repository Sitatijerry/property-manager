import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardStats from "../components/DashboardStats";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("No token found. Please login.");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/properties`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => alert("Access denied or token invalid"));
  }, [token]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Manager Dashboard
      </h2>
      <DashboardStats />
      <div style={{ padding: "2rem" }}>
        {user ? <p>Welcome, {user.message}</p> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Dashboard;
