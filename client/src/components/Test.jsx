import { useEffect, useState } from 'react';
import axios from 'axios';

const GenreList = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('https://api.rawg.io/api/genres?key=c2df07ee50b444d399431c55c6c42394', { withCredentials: false })
      .then(response => {
        setGenres(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);
  

  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
