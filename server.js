const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.TOKEN;

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/check-token", (req, res) => {
  res.json({
    token: TOKEN || "TOKEN NOT FOUND"
  });
});

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
  console.log(`Server running on port ${PORT}`);
});