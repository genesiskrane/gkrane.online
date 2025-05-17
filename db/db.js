const mongoose = require("mongoose");

const mongoDB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DOMAIN}`;
const mongoDB_URL_append = "?retryWrites=true&w=majority&appName=GK0";

const Vendors_DB = mongoose.createConnection(
	`${mongoDB_URL}/Vendors${mongoDB_URL_append}`
);

const Apps_DB = mongoose.createConnection(
	`${mongoDB_URL}/Apps${mongoDB_URL_append}`
);

module.exports = { Vendors_DB, Apps_DB };
