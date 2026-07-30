const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.TOKEN;

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "DM²K.A.R.S COMM CENTER Backend is running"
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