import { useState } from 'react';
import { getReleaseCalendar } from '../../api/gameApiCalls';
import { Link } from 'react-router-dom';

const ReleaseCalendar = () => {
  const [date, setDate] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const results = await getReleaseCalendar(date);
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
      <h1>Release Calendar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {!loading && games.length === 0 && <p>No releases found for the selected date.</p>}
      {games.map((game) => (
        <div key={game.id}>
          <h3><Link to={`/games/${game.id}`}>{game.name}</Link></h3>
          <img src={game.background_image} alt={game.name} />
          <p>Release Date: {game.released}</p>
        </div>
      ))}
    </div>
  );
};

export default ReleaseCalendar;


