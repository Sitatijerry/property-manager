require("dotenv").config();
const express = require("express");
const cors = require("cors");

// DB connection (if using MongoDB)
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);

const tenantRoutes = require("./routes/tenantRoutes");
app.use("/api/tenants", tenantRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const maintenanceRoutes = require("./routes/maintenanceRoutes");
app.use("/api/maintenance", maintenanceRoutes);

// Protected test route
const { protect } = require("./middleware/authMiddleware");
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you are authenticated.` });
});

// Sample route
app.get("/", (req, res) => {
  res.send("Property Management System API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
