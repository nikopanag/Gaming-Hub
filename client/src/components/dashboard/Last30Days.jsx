import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getLast30DaysReleases } from '../../api/gameApiCalls';
import styles from './last30Days.module.scss';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { DataContext } from '../../data/DataContext';
import { removeGameFromLibrary, addGameToLibrary } from '../../api/libraryApiCalls';

const Last30Days = () => {
  const [games, setGames] = useState([]);
  const { user } = useContext(DataContext);
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getLast30DaysReleases();
        setGames(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.library) {
      setLibrary(user.library);
    }
  }, [user]);

  const handleAddToLibrary = async (gameId) => {
    try {
      if (gameInLibrary(gameId)) {
        await removeGameFromLibrary(gameId);
        setLibrary((prevLibrary) =>
          prevLibrary.filter((game) => game.gameId !== gameId)
        );
      } else {
        const game = games.find((game) => game.id === gameId);
        const { id, name, background_image } = game;
        await addGameToLibrary(id, name, background_image);
        setLibrary((prevLibrary) => [...prevLibrary, { gameId, name, background_image }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const gameInLibrary = (gameId) => {
    return library.some((game) => game.gameId === gameId);
  };

  return (
    <div>
      <h2>Last 30 Days Releases</h2>
      <div className={styles.cardContainer}>
        {games.map((game) => (
          <div key={game.id} className={styles.card}>
            <img src={game.background_image} alt={game.name} />
            <h3>
              <Link to={`/games/${game.id}`}>{game.name}</Link>
            </h3>
            <p>{game.released}</p>
            <p>
              Metacritic Score: <span>{game.metacritic}</span>
            </p>
            <p>
              Platforms:{' '}
              <span>
                {game.platforms.map((platform) => platform.platform.name).join(', ')}
              </span>
            </p>
            <button
              onClick={() => handleAddToLibrary(game.id)}
              className={styles.addButton}
            >
              {gameInLibrary(game.id) ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Last30Days;







