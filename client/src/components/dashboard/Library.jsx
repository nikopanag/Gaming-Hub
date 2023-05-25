import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { getUserLibrary } from "../../api/libraryApiCalls";


const Library = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await getUserLibrary();
        setLibrary(response.library);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <>
      <Sidebar />
      <div>
        <h2>Library</h2>
        {library.map((game, index) => (
          <div key={index}>
            <h3>
              <Link to={`/games/${game.gameId}`}>{game.title}</Link>
            </h3>
            <img src={game.image} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Library;
