const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided in query parameters' });
  }

  const urlsArray = Array.isArray(urls) ? urls : [urls];

  try {
    const results = await Promise.all(urlsArray.map(fetchNumbersFromURL));

    const combinedNumbers = results.reduce((acc, { numbers }) => [...acc, ...numbers], []);

    res.json({ numbers: combinedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function fetchNumbersFromURL(url) {
  try {
    const response = await axios.get(url);
    const { numbers } = response.data;
    return { numbers };
  } catch (error) {
    console.error(`Error fetching numbers from URL ${url}:`, error.message);
    return { numbers: [] };
  }
}

app.listen(port, () => {
  console.log(`number-management-service is listening at http://localhost:${port}`);
});
