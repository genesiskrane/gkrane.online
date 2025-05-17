const models = require("./models");
const connections = require("./db");

async function connectToDatabase() {
	try {
		await Promise.all([
			new Promise((resolve, reject) => {
				connections.Vendors_DB.once("open", () => {
					console.log("Connected to Vendors Database");
					resolve();
				});
				connections.Vendors_DB.on("error", reject);
			}),
			new Promise((resolve, reject) => {
				connections.Apps_DB.once("open", () => {
					console.log("Connected to Apps Database");
					resolve();
				});
				connections.Apps_DB.on("error", reject);
			}),
		]);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	connectToDatabase,
	...models,
};
