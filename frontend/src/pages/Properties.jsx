import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  const handleDelete = (deletedId) => {
    setProperties((prev) => prev.filter((p) => p._id !== deletedId));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Properties</h2>
            <Link
              to="/manager/properties/create"
              className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 transition"
            >
              + Add Property
            </Link>
          </div>

          {loading && <p className="text-gray-500">Loading properties...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && properties.length === 0 && (
            <p className="text-gray-500">No properties found.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
