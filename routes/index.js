const express = require("express");
const router = express.Router();
const controller = require("../controllers");

const apps = [
	{
		name: "Kreative",
		client: [{ name: "pro" }],
	},
	{
		name: "Mart",
		client: [
			{
				name: "store",
			},
			{ name: "shop" },
		],
	},
];

// auth
router.post("/register-vendor", controller.registerVendor);

// krane

router.get("/krane/get-app-data", (req, res) => {
	const name = req.query.name;

	apps.forEach((app) => {
		app.apiURL = process.env.CORE;
	});

	const app = apps.find((app) => app.name == name);
	res.json(app);
});

router.get("/krane/get-client-data", (req, res) => {
	const name = req.query.name;

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
		{
			name: "Pro",
			config: {
				name: "Pro",
			},
		},
	];

	const app = apps.find((app) => app.name == name);
	res.json(app);
});

module.exports = router;
