const express = require("express");
const router = express.Router();
const controller = require("../controllers");

const apps = [
	{ name: "GKrane" },
	{
		name: "Kreative",
		repos: {
			client: [{ name: "pro", repo: "https://github.com/genesiskrane/kreative" }],
		},
		exts: ["pro"],
	},
	{
		name: "Mart",
		repos: {
			client: [
				{ name: "store", repo: "https://github.com/genesiskrane/store" },
				{ name: "shop", repo: "https://github.com/genesiskrane/shop" },
			],
		},
		exts: ["store", "shop"],
	},
];

// auth
router.post("/register-vendor", controller.registerVendor);

// krane

router.get("/krane/get-app-data", (req, res) => {
	const name = req.params.name;

	apps.forEach((app) => {
		app.apiURL = process.env.CORE;
	});

	console.log(name);
	const app = apps.find((app) => app.name == name);
	console.log(app);
	res.json(app);
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
