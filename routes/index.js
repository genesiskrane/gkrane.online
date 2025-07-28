const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let apps = [
	{
		name: "GKrane",
		description: "Genesis Krane's personal website",
		url: "https://gkrane.online",
	},
	{
		name: "GKrane API Server",
		description: "API server for GKrane",
		url: "https://api.gkrane.online",
	},
];

// auth
router.post("/register-vendor", controller.registerVendor);


router.get("/get-client-data", (req, res) => {
	const name = req.query.name;


	const app = apps.find((app) => app.name == name);
	res.json(app);
});

router.post("/data", (req, res) => {
	apps = req.body;
	res.send("Saved");
});

module.exports = router;
