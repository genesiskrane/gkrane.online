const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const express = require("express");
const router = express.Router();
const controller = require("../controllers");

let secrets = [
  {
    id: "secret",
    name: "SECRET",
  },
  {
    id: "password",
    name: "MONGODB_PASSWORD",
  },
  {
    id: "kingujebeh",
    name: "KINGUJEBEH",
  },
  {
    id: "augmentplus",
    name: "AUGMENTPLUS",
  },
  {
    id: "genesiskrane",
    name: "GENESISKRANE",
  },
];

let data = {
  projects: [
    {
      id: "CPanel",
      name: "Control Panel",
      repo: "https://github.com/genesiskrane/CPanel",
      clients: [
        {
          default: "https://github.com/Augment-Plus/vite-plus",
        },
      ],
      domains: [],
      description: "A control panel for managing your projects.",
    },
    {
      id: "unknown",
      name: "Unknown",
      repo: "https://github.com/kingujebeh/Express",
      clients: [
        {
          default: "https://github.com/kingujebeh/kingdom",
        },
      ],
      domains: ["augmentplus.space", "africa.world"],
      description: "Ammadioha(Ammadiamen)",
    },
    {
      id: "currency",
      name: "Currency",
      repo: "https://github.com/kingujebeh/currency",
      clients: [
        {
          default: "https://github.com/kingujebeh/kingdom",
        },
      ],
      domains: ["marblelimit.com"],
      description: "Currency",
    },
    {
      id: "dotpro",
      name: ".pro Express Server",
      repo: "https://github.com/Augment-Plus/.pro",
      clients: [
        {
          default: "https://github.com/Augment-Plus/pro",
        },
      ],
      domains: ["creatyve3d.pro"],
      description: "A .pro server for hosting professional projects.",
    },
    {
      id: "dotstore",
      name: ".store Express Server",
      repo: "https://github.com/Augment-Plus/.store",
      clients: [
        {
          default: "https://github.com/Augment-Plus/store",
        },
      ],
      domains: ["yatsar.store"],
      description: "A .store server for e-commerce projects.",
    },
    {
      id: "dotshop",
      name: ".shop Express Server",
      repo: "https://github.com/Augment-Plus/.shop",
      clients: [
        {
          default: "https://github.com/Augment-Plus/shop",
        },
      ],
      domains: ["osasengineering.shop"],
      description: "A .shop server for online shopping projects.",
    },
  ],
  tokens: {},
  password: "No Password Yet",
};

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
  for (secret of secrets) {
    let secretValue = await getSecret(secret.name);
    secret.value = secretValue;
  }
  data.tokens["Augment-Plus"] = secrets.find(
    (secret) => secret.name == "AUGMENTPLUS"
  ).value;
  data.tokens.genesiskrane = secrets.find(
    (secret) => secret.name == "GENESISKRANE"
  ).value;
  data.tokens.kingujebeh = secrets.find(
    (secret) => secret.name == "KINGUJEBEH"
  ).value;
  data.password = secrets.find(
    (secret) => secret.name == "MONGODB_PASSWORD"
  ).value;
})();

// auth
router.post("/register-vendor", controller.registerVendor);

router.get("/CP/build", (req, res) => {
  // Send All Project Data
  if (
    req.query.secret === secrets.find((secret) => secret.name == "SECRET").value
  ) {
    res.json(data);
  } else {
    res.json([]);
  }
});

module.exports = router;
