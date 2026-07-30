const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

const TOKEN = process.env.TOKEN;

// Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Check Token
app.get("/check-token", (req, res) => {
  res.json({
    token: TOKEN || "TOKEN NOT FOUND"
  });
});

// Wallet Balance
app.get("/balance", async (req, res) => {
  try {
    const response = await axios.get("https://rahimdata.com/api/user/", {
      headers: {
        Authorization: `Token ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch wallet balance",
      details: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DM²K.A.R.S COMM CENTER running on port ${PORT}`);
});