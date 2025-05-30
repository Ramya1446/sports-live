const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/upcoming-matches', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/matches?status=SCHEDULED', {
      headers: {
        'X-Auth-Token': 'a72c6edf03a14d68930c1e0f0b231a8b'
      }
    });

    if (!response.ok) {
      throw new Error(`API error with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming matches' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
