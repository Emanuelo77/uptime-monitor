import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/status') // URL des Backends
      .then(res => res.json())
      .then(data => {
        setSites(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Daten konnten nicht vom Backend geladen werden.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Lädt...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1>Uptime Monitor</h1>
      <ul className="site-list">
        {sites.map(site => (
          <li
            key={site.id}
            className={`site-card ${site.status === 'online' ? 'online' : 'offline'}`}
          >
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="site-link">
              {site.url}
            </a>{' '}
            ist <strong>{site.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
