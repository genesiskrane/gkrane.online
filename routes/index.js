const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let data;

// auth
router.post("/register-vendor", controller.registerVendor);

router.post("/CP/data", (req, res) => {
  data = req.body;
  res.send("Data Saved");
});

router.get("/CP/build", (req, res) => {
  // Send All Project Data
  res.json(data);
});

module.exports = router;
