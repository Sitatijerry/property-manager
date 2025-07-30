// src/context/PropertyContext.jsx
import { createContext, useContext, useState } from "react";

// Create context
export const PropertyContext = createContext();

// Custom hook for easy access
export const useProperties = () => useContext(PropertyContext);

// Context Provider
export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties((prev) => [...prev, property]);
  };

  const removeProperty = (id) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  return (
    <PropertyContext.Provider
      value={{ properties, setProperties, addProperty, removeProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
