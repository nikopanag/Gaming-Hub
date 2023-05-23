import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../api/gameApiCalls';

const TitlePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGameById(id);
      setGame(data);
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const gameTitle = game.name;
  console.log(gameTitle)

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>Release Date: {game.released}</p>
      <p>
        Metacritic Score: {game.metacritic || 'No metacritic score available'}
      </p>
      <p>
        Developers: {game.developers.map(dev => dev.name).join(', ')}
      </p>
      <p>
        ESRB Rating: {game.esrb_rating?.name || 'Not available'}
      </p>
      <p>
        Publishers: {game.publishers.map(pub => pub.name).join(', ')}
      </p>
      <p>
        Platforms: {game.platforms.map(plat => plat.platform.name).join(', ')}
      </p>
      <p>Description: {game.description_raw}</p>
    </div>
  );
};

export default TitlePage;



