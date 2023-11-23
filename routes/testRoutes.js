const express = require("express");
const router = express.Router();

router.get("/mrinmoy", (req, res) => {
  res.status(200).json({ status: 1, message: "Success" });
});

module.exports = router;
