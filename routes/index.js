const express = require("express");
const router = express.Router();
const controller = require("../controllers");

// auth
router.post("/register-vendor", controller.registerVendor);

// krane

router.get("/krane/get-app-data", (req, res) => {
    console.log('Data Req');
	apps = JSON.parse(process.env.DATA);

	apps.forEach((app) => {
		app.apiURL = process.env.CORE;
		app.exts = ["pro"];
	});

	res.json(apps[1]);
});

module.exports = router;
