const { Vendor } = require("../db");

// CONTROLLERS
const registerVendor = async (req, res) => {
	const { uid, displayName, email } = req.body;

	// SAVE TO MONGODB
	try {
		const vendor = new Vendor({
			_id: uid,
			displayName,
			email,
			vendor: req.body.vendor,
		});

		await vendor.save();
		res.send(true);
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error.message);
	}
};

module.exports = { registerVendor };
