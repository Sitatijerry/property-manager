const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllTenants,
  getMyProfile,
  assignTenantToProperty
} = require('../controllers/tenantController');

router.use(protect);

router.get('/', getAllTenants);
router.get('/me', getMyProfile);
router.post('/assign', assignTenantToProperty);

module.exports = router;
