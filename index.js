
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json());

app.post('/mirage', async (req, res) => {
    if (!WEBHOOK_URL) return res.status(500).send('Webhook URL not set');

    const { jobId } = req.body;
    const message = {
        content: `Phát hiện đảo Mirage trong Blox Fruit!\n**Job ID:** \`${jobId || 'Không có'}\``
    };

    try {
        await axios.post(WEBHOOK_URL, message);
        res.status(200).send('Notified!');
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send('Failed to send webhook');
    }
});

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
