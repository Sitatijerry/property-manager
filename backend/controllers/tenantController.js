const User = require('../models/User');
const Property = require('../models/Property');

// List all tenants (landlord view)
const getAllTenants = async (req, res) => {
  if (req.user.role !== 'landlord') return res.status(403).json({ message: 'Only landlords can view this' });

  const tenants = await User.find({ role: 'tenant' }).populate('property', 'name address');
  res.json(tenants);
};

// Get tenant profile (tenant only)
const getMyProfile = async (req, res) => {
  if (req.user.role !== 'tenant') return res.status(403).json({ message: 'Only tenants can access this' });

  const tenant = await User.findById(req.user.id).populate('property', 'name address monthlyRent');
  res.json(tenant);
};

// Assign tenant to property (landlord only)
const assignTenantToProperty = async (req, res) => {
  if (req.user.role !== 'landlord') return res.status(403).json({ message: 'Only landlords can assign' });

  const { tenantId, propertyId } = req.body;

  const tenant = await User.findById(tenantId);
  const property = await Property.findById(propertyId);

  if (!tenant || !property) return res.status(404).json({ message: 'Tenant or Property not found' });

  tenant.property = propertyId;
  property.tenant = tenantId;

  await tenant.save();
  await property.save();

  res.json({ message: 'Tenant assigned successfully' });
};

module.exports = {
  getAllTenants,
  getMyProfile,
  assignTenantToProperty
};
