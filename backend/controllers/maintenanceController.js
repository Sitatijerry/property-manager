const Maintenance = require('../models/Maintenance');
const Property = require('../models/Property');

// Tenant raises request
const createRequest = async (req, res) => {
  const { title, description, priority, property } = req.body;

  if (req.user.role !== 'tenant') return res.status(403).json({ message: 'Only tenants can create requests' });

  const request = await Maintenance.create({
    title, description, priority, property, tenant: req.user.id
  });

  res.status(201).json(request);
};

// View requests (landlord or manager)
const getRequests = async (req, res) => {
  let filter = {};

  if (req.user.role === 'landlord') {
    filter = { property: { $in: await Property.find({ landlord: req.user.id }).distinct('_id') } };
  } else if (req.user.role === 'manager') {
    filter = { property: { $in: await Property.find({ manager: req.user.id }).distinct('_id') } };
  } else if (req.user.role === 'tenant') {
    filter = { tenant: req.user.id };
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }

  const requests = await Maintenance.find(filter).populate('property', 'name').populate('tenant', 'name');
  res.json(requests);
};

// Update request status (landlord/manager)
const updateStatus = async (req, res) => {
  const { status } = req.body;
  const request = await Maintenance.findById(req.params.id);

  if (!request) return res.status(404).json({ message: 'Request not found' });

  const property = await Property.findById(request.property);

  if (
    (req.user.role === 'landlord' && property.landlord.toString() === req.user.id) ||
    (req.user.role === 'manager' && property.manager?.toString() === req.user.id)
  ) {
    request.status = status;
    await request.save();
    res.json(request);
  } else {
    res.status(403).json({ message: 'Not authorized to update this request' });
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateStatus
};
