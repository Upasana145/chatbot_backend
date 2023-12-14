const express = require("express");
const router = express.Router();
const {
  getDepts,
  bookings,
  getDoctors,
  getAllBookings,
} = require("../controllers/chatControllers");

// router.post("/", chatHandler);
router.post("/depts", getDepts);
router.post("/doctors", getDoctors);
router.post("/bookings", bookings);
router.post("/getAllBookings", getAllBookings);

module.exports = router;
