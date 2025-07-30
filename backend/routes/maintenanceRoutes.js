const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRequest,
  getRequests,
  updateStatus
} = require('../controllers/maintenanceController');

router.use(protect);

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateStatus);

module.exports = router;
