const Property = require("../models/Property");

// @desc   Add a new property
// @route  POST /api/properties
// @access Private
const createProperty = async (req, res) => {
  try {
    const { name, location, type, status, monthlyRent } = req.body;

    // Validation
    if (!name || !location || !type || !status || monthlyRent === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProperty = await Property.create({
      name,
      location,
      type,
      status,
      monthlyRent,
    });

    res.status(201).json({
      message: "Property added successfully ✅",
      property: newProperty,
    });
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(500).json({
      message: "Failed to add property ❌",
      error: err.message,
    });
  }
};

// @desc   Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties ❌" });
  }
};

// @desc   Get a single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property" });
  }
};

// @desc   Update property
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Updated successfully", property: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed ❌" });
  }
};

// @desc   Delete property
const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed ❌" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
};

