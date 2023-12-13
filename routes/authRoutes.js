const express = require("express");
const {
  loginHandler,
  registrationHandler,
  verifyOTP,
} = require("../controllers/authControllers");
const router = express.Router();

// router.post("/registration", registrationHandler);
router.post("/login", loginHandler);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
