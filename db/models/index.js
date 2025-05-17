const mongoose = require("mongoose");
const connections = require("../db");

const { vendorSchema, appSchema } = require("../schemas");

const Vendor = connections.Vendors_DB.model("Vendor", vendorSchema);
const App = connections.Apps_DB.model("App", appSchema);

module.exports = { Vendor, App };
