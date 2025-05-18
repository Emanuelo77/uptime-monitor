const express = require('express');
const fetch = require('node-fetch'); // Folosește node-fetch@2 pentru require
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sites = [
  { id: 1, url: 'https://www.google.com' },
  { id: 2, url: 'https://www.github.com' }
];

const statusData = {};

// Funcție pentru verificarea statusului site-urilor
const checkSitesStatus = async () => {
  for (const site of sites) {
    try {
      const response = await fetch(site.url, { method: 'HEAD' });
      statusData[site.id] = response.ok ? 'online' : 'offline';
    } catch {
      statusData[site.id] = 'offline';
    }
  }
};

// Rulare periodică la fiecare 30 secunde
checkSitesStatus();
setInterval(checkSitesStatus, 30000);

// Endpoint pentru status
app.get('/status', (req, res) => {
  const results = sites.map(site => ({
    id: site.id,
    url: site.url,
    status: statusData[site.id] || 'unbekannt',
  }));

  res.json({
    linkedin: 'https://www.linkedin.com/in/emanuel-crisan',
    sites: results
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rulează pe portul ${PORT}`);
  console.log('Profil LinkedIn:', 'https://www.linkedin.com/in/emanuel-crisan');
});
