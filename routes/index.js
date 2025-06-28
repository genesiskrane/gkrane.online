const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let apps;

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
