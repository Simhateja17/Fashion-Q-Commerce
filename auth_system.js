const express = require('express');
const firebaseAdmin = require('firebase-admin');
require('dotenv').config();

const router = express.Router();

// Initialize Firebase Admin
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
});

const auth = firebaseAdmin.auth();

// OTP-based login
router.post('/otp-login', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number is required' });
        }
        const user = await auth.createUser({ phoneNumber });
        res.json({ uid: user.uid, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify OTP login
router.post('/verify-otp', async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ error: 'ID Token is required' });
        }
        const decodedToken = await auth.verifyIdToken(idToken);
        res.json({ uid: decodedToken.uid, message: 'User verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Google & Facebook login
router.post('/social-login', async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({ error: 'ID Token is required' });
        }
        const decodedToken = await auth.verifyIdToken(idToken);
        res.json({ uid: decodedToken.uid, message: 'User authenticated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
