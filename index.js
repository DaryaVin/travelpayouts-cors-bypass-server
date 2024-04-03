import express from "express";
import cors from "cors";
import fetch from "node-fetch";



// const express = require('express');
// const cors = require('cors');
// const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(express.json());


const token = "43b0dbc155c5db417b74b3b60707333b";



app.post('/getAviasales', cors(corsOptions), async (req, res) => {
    let currentRequtstEndPoint = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?";

    for (const key in req.body) {
        currentRequtstEndPoint += key + "=" + req.body[key] + "&"
    }
    currentRequtstEndPoint += "token=" + token;

    const fetchOptions = {
        method: 'GET' 
    }
    const response = await fetch(currentRequtstEndPoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});
app.post('/bookingAirTicker', cors(corsOptions), async (req, res) => {
    res.json({...req.body, success: true});
});

app.get('/getData/:type', cors(corsOptions), async (req, res) => {
    let currentRequtstEndPoint = "http://api.travelpayouts.com/data/ru/" + req.params.type + ".json";
    console.log("currentRequtstEndsPoint", currentRequtstEndPoint);

    const fetchOptions = {
        method: 'GET' 
    }
    const response = await fetch(currentRequtstEndPoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});