const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getAllUsers);        // fetch all users
router.post("/", createUser);        // add new user
router.delete("/:id", deleteUser);   // delete by id

module.exports = router;
