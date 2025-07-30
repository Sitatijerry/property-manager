import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Hotel",
    status: "active",         // ✅ lowercase to match backend enum
    monthlyRent: "",          // ✅ required field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add a property.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/properties`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property added successfully ✅");
      navigate("/properties");
    } catch (error) {
      console.error("Add property failed:", error.response?.data || error.message);
      alert(
        `Failed to add property ❌: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add New Property
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Property Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Hotel">Hotel</option>
            <option value="Apartment">Apartment</option>
            <option value="BnB">BnB</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="under-maintenance">Under Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Monthly Rent (KES)
          </label>
          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Property
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;
