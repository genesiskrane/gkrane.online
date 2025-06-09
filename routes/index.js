const express = require("express");
const router = express.Router();
const controller = require("../controllers");

// auth
router.post("/register-vendor", controller.registerVendor);

// krane

router.get("/get-app-data", (req, res) => {
	res.json(JSON.parse(process.env.DATA)[1]);
});

module.exports = router;
