const express = require('express');
const router = express.Router();

// Webhook for real-time tracking updates
router.post('/shiprocket-webhook', async (req, res) => {
    try {
        console.log('Webhook received:', req.body);
        
        // Process the webhook data (e.g., update order status in database)
        
        res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process webhook' });
    }
});

module.exports = router;
