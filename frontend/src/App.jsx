import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import CreateProperty from "./pages/CreateProperty";

// Layout
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/properties"
        element={
          <Layout>
            <Properties />
          </Layout>
        }
      />
      <Route
        path="/create-property"
        element={
          <Layout>
            <CreateProperty />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />

      <Route
        path="/manager/properties"
        element={
          <Layout>
            <Properties />
          </Layout>
        }
      />
      <Route
        path="/manager/properties/create"
        element={
          <Layout>
            <CreateProperty />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
