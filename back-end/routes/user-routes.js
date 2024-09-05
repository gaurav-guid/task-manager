const express = require("express");
const router = express.Router();

// User signup route
router.post("/signup", (req, res) => {
  res.send("user signup !!");
});

// User login route
router.post("/login", (req, res) => {
  res.send("user login !!");
});

module.exports = router;
