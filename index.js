require("./config");
const { init } = require("./core");

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const app = express();

const router = require("./routes");

// HTTPS Redirect
app.use((req, res, next) => {
	if (process.env.NODE_ENV == "production")
		if (req.headers["x-forwarded-proto"] !== "https") {
			return res.redirect(`https://${req.headers.host}${req.url}`);
		}
	next();
});

app.set("trust proxy", true);

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
	res.json({
		name: "GKrane API Server",
	});
});

// Catch All
app.all("/{*any}", (req, res) => {
	res.json({});
});

const PORT = process.env.PORT || 7000;

(async () => {
	await init();

	app.listen(PORT, () => {
		console.log(`Server Started @ ${PORT}`);
	});
})();
