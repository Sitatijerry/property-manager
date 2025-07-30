const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["Hotel", "Apartment", "BnB"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "under-maintenance"],
    required: true,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
