const express = require("express");
const router = express.Router();
const {
  getDepts,
  bookings,
  getDoctors,
} = require("../controllers/chatControllers");

// router.post("/", chatHandler);
router.post("/depts", getDepts);
router.post("/doctors", getDoctors);
router.post("/bookings", bookings);

module.exports = router;
