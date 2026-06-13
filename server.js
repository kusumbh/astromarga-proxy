const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const USER_ID = '654279';
const API_KEY = 'ak-fba6ac4c4fe959f7c20960c1f3edcac0f8cd30e5';
const AUTH = Buffer.from(USER_ID + ':' + API_KEY).toString('base64');
app.use('/api', async (req, res) => {
  try {
    const endpoint = req.path.slice(1);
    const url = 'https://json.astrologyapi.com/v1/' + endpoint;
    const response = await axios.post(url, req.body, {
      headers: {
        'Authorization': 'Basic ' + AUTH,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message, details: error.response?.data });
  }
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(3000, () => console.log('Proxy running on port 3000'));
