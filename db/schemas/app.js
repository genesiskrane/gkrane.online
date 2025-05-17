const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		displayName: { type: String, required: true },
		email: { type: String, required: true },
		type: { type: String, required: true },
	},
	{
		virtuals: {
			profile: {
				get() {
					const profile = {
						_id: this._id,
						displayName: this.displayName,
					};
					return profile;
				},
			},
		},
		methods: {},
		statics: {},
	}
);

appSchema.set("toObject", { virtuals: true });
appSchema.set("toJSON", { virtuals: true });

module.exports = appSchema;
