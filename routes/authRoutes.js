const express = require("express");
const {
  loginHandler,
  registrationHandler,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/registration", registrationHandler);
router.post("/login", loginHandler);

module.exports = router;
