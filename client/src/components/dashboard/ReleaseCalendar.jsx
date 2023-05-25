import { useState } from 'react';
import { getReleaseCalendar } from '../../api/gameApiCalls';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ReleaseCalendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (month) => {
    setLoading(true);

    try {
      const results = await getReleaseCalendar({ month, year });
      setGames(results);
      console.log(results);
    } catch (error) {
      console.error('Error fetching releases:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>Release Calendar</h1>
      <div>
        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            {Array.from({ length: 42 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        {Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })).map((m, i) => (
          <button key={i} onClick={() => handleSubmit(i + 1)}>{m}</button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && games.length === 0 && <p>No releases found for the selected month.</p>}
      {games.map((game) => (
        <div key={game.id}>
          <h3><Link to={`/games/${game.id}`}>{game.name}</Link></h3>
          <img src={game.background_image} alt={game.name} />
          <p>Release Date: {game.released}</p>
          <p>Platforms: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default ReleaseCalendar;


