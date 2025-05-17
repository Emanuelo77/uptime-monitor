import { useEffect, useState } from 'react';

function App() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/status')
      .then(res => res.json())
      .then(data => setSites(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Uptime Monitor</h1>
      <ul>
        {sites.map(site => (
          <li key={site.id}>
            <b>{site.url}</b> - Status: <span style={{ color: site.status === 'online' ? 'green' : 'red' }}>{site.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
