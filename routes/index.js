const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let data, secret, password;

// This script builds the server files and accesses a secret from Google Cloud Secret Manager
const client = new SecretManagerServiceClient();

async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/324961829508/secrets/${secretName}/versions/latest`,
  });
  // Extract the payload as a string
  const payload = version.payload.data.toString("utf8");
  return payload;
}

getSecret("SECRET")
  .then((secretValue) => {
    secret = secretValue;
    console.log("Secret retrieved successfully:");
  })
  .catch((err) => {
    console.error("Failed to retrieve secret:", err);
  });

getSecret("MONGODB_PASSWORD")
  .then((secretValue) => {
    password = secretValue;
    console.log("Secret retrieved successfully:");
  })
  .catch((err) => {
    console.error("Failed to retrieve secret:", err);
  });

// auth
router.post("/register-vendor", controller.registerVendor);

router.post("/CP/data", (req, res) => {
  data = req.body;
  res.send("Data Saved");
});

router.get("/CP/build", (req, res) => {
  // Send All Project Data

  if (req.query.secret !== secret) {
    res.json([]);
  } else {
    data.password = password;
    res.json(data);
  }
});

module.exports = router;
