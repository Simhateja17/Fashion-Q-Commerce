const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const SHIPROCKET_API_BASE = 'https://apiv2.shiprocket.in/v1/external';
let shiprocketToken = '';

// Shiprocket Authentication
async function authenticateShiprocket() {
    try {
        const response = await axios.post(`${SHIPROCKET_API_BASE}/auth/login`, {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        shiprocketToken = response.data.token;
        console.log('Shiprocket Authenticated');
    } catch (error) {
        console.error('Error authenticating Shiprocket:', error.response?.data || error.message);
    }
}

// Middleware to ensure Shiprocket authentication
async function ensureShiprocketAuth(req, res, next) {
    if (!shiprocketToken) {
        await authenticateShiprocket();
    }
    req.shiprocketToken = shiprocketToken;
    next();
}

// Create an Order with Shiprocket Quick
router.post('/create-order', ensureShiprocketAuth, async (req, res) => {
    try {
        const orderData = req.body;
        const response = await axios.post(`${SHIPROCKET_API_BASE}/orders/create/adhoc`, orderData, {
            headers: { Authorization: `Bearer ${req.shiprocketToken}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Get Order Tracking Details
router.get('/track-order/:order_id', ensureShiprocketAuth, async (req, res) => {
    try {
        const { order_id } = req.params;
        const response = await axios.get(`${SHIPROCKET_API_BASE}/courier/track?order_id=${order_id}`, {
            headers: { Authorization: `Bearer ${req.shiprocketToken}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

module.exports = router;
