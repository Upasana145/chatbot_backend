const express = require("express");
const {
  loginHandler,
  registrationHandler,
  verifyOTP,
  registrationHandler2,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/registration", registrationHandler);
router.post("/registration2", registrationHandler2);
router.post("/login", loginHandler);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
