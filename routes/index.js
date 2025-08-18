const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const express = require("express");

const data = require("../data");
const controller = require("../controllers");

const router = express.Router();

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

(async () => {
  for (secret of data.secrets) {
    let secretValue = await getSecret(secret.name);
    secret.value = secretValue;
  }
  data.tokens["Augment-Plus"] = data.secrets.find(
    (secret) => secret.name == "AUGMENTPLUS"
  ).value;
  data.tokens.genesiskrane = data.secrets.find(
    (secret) => secret.name == "GENESISKRANE"
  ).value;
  data.tokens.kingujebeh = data.secrets.find(
    (secret) => secret.name == "KINGUJEBEH"
  ).value;
  data.password = data.secrets.find(
    (secret) => secret.name == "MONGODB_PASSWORD"
  ).value;
})();

// auth
router.post("/register-vendor", controller.registerVendor);

router.get("/CP/build", (req, res) => {
  // Send All Project Data
  if (
    req.query.secret ===
    data.secrets.find((secret) => secret.name == "SECRET").value
  ) {
    res.json(data);
  } else {
    res.json([]);
  }
});

router.get("/users", (req, res) => {
  res.send(data.users);
});

module.exports = router;
