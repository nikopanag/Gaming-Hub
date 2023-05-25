import { useEffect, useState } from "react";
import { getUpcomingGamesNextWeek } from "../../api/gameApiCalls";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const NextWeek = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getUpcomingGamesNextWeek();
        setGames(results);
      } catch (error) {
        console.error("Error fetching next week releases:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <h1>Releasing Next Week</h1>
      {games && games.length > 0 ? (
        games.map((game) => (
          <div key={game.id}>
            <img src={game.background_image} alt={game.name} />
            <h3>
              <Link to={`/games/${game.id}`}>{game.name}</Link>
            </h3>
            <p>{game.released}</p>
            <p>
              Metacritic Score: <span>{game.metacritic}</span>
            </p>
            {game.platforms && game.platforms.length > 0 && (
              <p>
                Platforms: <span>{game.platforms.map((platform) => platform.platform.name).join(", ")}</span>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
};

export default NextWeek;
