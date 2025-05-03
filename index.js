const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.get('/mirage', async (req, res) => {
  if (!WEBHOOK_URL) {
    return res.status(500).send('Webhook URL not set');
  }
  try {
    await axios.post(WEBHOOK_URL, {
      content: 'Phát hiện đảo Mirage trong Blox Fruit!'
    });
    res.send('Đã gửi notify tới Discord Webhook!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi gửi webhook');
  }
});

app.get('/', (req, res) => {
  res.send('API đang chạy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});