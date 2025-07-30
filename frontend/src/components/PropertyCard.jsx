import React from "react";
import axios from "axios";

const PropertyCard = ({
  _id,
  name,
  location,
  type,
  status,
  units = 0,
  monthlyRent,
  onDelete,
}) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete ${name}?`);
    if (!confirmed) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/properties${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Deleted successfully ✅");
      if (onDelete) onDelete(_id);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete property ❌");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition border border-gray-100">
      <h3 className="text-lg font-semibold text-green-700">{name}</h3>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm text-gray-400">{type}</p>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span
          className={`px-3 py-1 rounded-full font-medium ${
            status?.toLowerCase() === "active"
              ? "bg-green-100 text-green-700"
              : status?.toLowerCase() === "inactive"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>
        <span className="text-gray-600">{units} units</span>
      </div>

      {monthlyRent !== undefined && (
        <p className="mt-2 text-sm text-gray-800 font-medium">
          Rent: KES {monthlyRent}
        </p>
      )}

      <button
        onClick={handleDelete}
        className="mt-4 text-red-600 text-sm hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default PropertyCard;
