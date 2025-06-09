const express = require("express");
const router = express.Router();
const controller = require("../controllers");

// auth
router.post("/register-vendor", controller.registerVendor);

// krane

router.get("/krane/get-app-data", (req, res) => {
	apps = JSON.parse(process.env.DATA);

	apps.forEach((app) => {
		app.apiURL = process.env.CORE;
		app.exts = ["pro"];
	});

	res.json(apps[1]);
});

router.get("/krane/get-client-data", (req, res) => {
	const name = req.params.name;

	const apps = [
		{
			name: "Kreative",
			config: {
				name: "Kreative",
			},
		},
		{
			name: "Mart",
			config: {
				name: "Mart",
			},
		},
		{
			name: "Store",
			config: {
				name: "Store",
			},
		},
		{
			name: "Shop",
			config: {
				name: "Shop",
			},
		},
	];

	const app = apps.find((app) => app.name == name);
	console.log(name);
	res.json(app);
});

module.exports = router;
