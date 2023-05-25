import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { getGenreBasedRecommendations } from '../../api/gameApiCalls'; 

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const results = await getGenreBasedRecommendations();
        setRecommendations(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="recommendations">
        <h2>Recommendations for you:</h2>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((game, index) => (
              <li key={index}>
                <h3>{game.name}</h3>
                <img src={game.background_image} alt={game.name} />
                <p>{game.description}</p>
                <p>Genres: {game.genres.map((genre) => genre.name).join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available at this moment</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

