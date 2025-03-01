const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000";

app.post("/predict-flight-price", async (req, res) => {
    try {
        const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
        console.log("ML Model Response:", response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error connecting to ML model" });
    }
});

app.listen(5001, () => {
    console.log("Node.js server running on port 5001");
});
