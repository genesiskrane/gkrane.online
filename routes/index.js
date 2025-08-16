const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const express = require("express");
const router = express.Router();
const controller = require("../controllers");

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
  tokens: {
    "Augment-Plus": "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",
    genesiskrane: "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",
    kingujebeh: "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",
  },
  password: "No Password Yet",
};

let secret;
let password;

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
    console.log("Password retrieved successfully:");
  })
  .catch((err) => {
    console.error("Failed to retrieve secret:", err);
  });

// auth
router.post("/register-vendor", controller.registerVendor);

router.get("/CP/build", (req, res) => {
  // Send All Project Data

  if (req.query.secret == secret) {
    data.password = password ? password : "No Password Yet";
    res.json(data);
  } else {
    res.json([]);
  }
});

module.exports = router;
