import { useEffect, useState } from 'react';
import { getHotGamesThisWeek } from '../../api/gameApiCalls';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const HotThisWeek = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await getHotGamesThisWeek();
                setGames(results);
            } catch (error) {
                console.error('Error fetching hot games of the week:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Sidebar />
            <h1>Hot This Week</h1>
            <div >
                {games.map((game) => (
                    <div key={game.id} >
                        <img src={game.background_image} alt={game.name} />
                        <h3><Link to={`/games/${game.id}`}>{game.name}</Link></h3>
                        <p>{game.released}</p>
                        <p>
                            Metacritic Score: <span>{game.metacritic}</span>
                        </p>
                        <p>
                            Platforms: <span>
                                {game.platforms.map((platform) => platform.platform.name).join(', ')}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotThisWeek;


