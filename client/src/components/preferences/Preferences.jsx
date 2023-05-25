import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePreferences } from '../../api/userApiCalls';
import img from "../../../public/download.png"
import styles from "./Preferences.module.scss"

const Preferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = [
    { id: 4, name: 'Action' },
    { id: 51, name: 'Indie' },
    { id: 3, name: 'Adventure' },
    { id: 5, name: 'RPG' },
    { id: 10, name: 'Strategy' },
    { id: 2, name: 'Shooter' },
    { id: 40, name: 'Casual' },
    { id: 14, name: 'Simulation' },
    { id: 7, name: 'Puzzle' },
    { id: 11, name: 'Arcade' },
    { id: 83, name: 'Platformer' },
    { id: 59, name: 'Massively Multiplayer' },
    { id: 1, name: 'Racing' },
    { id: 15, name: 'Sports' },
    { id: 6, name: 'Fighting' },
    { id: 19, name: 'Family' },
    { id: 28, name: 'Board Games' },
    { id: 34, name: 'Educational' },
    { id: 17, name: 'Card' }
  ];

  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    const genreId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, genreId]);
    } else {
      setSelectedGenres(selectedGenres.filter(genre => genre !== genreId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const genreIds = selectedGenres.map(genre => genre);
      console.log(selectedGenres)
      const response = await updatePreferences(genreIds);
      console.log(response);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Select your preferences</h2>
      <form onSubmit={handleSubmit}>
        {genres.map(genre => (
          <div key={genre.id} className={styles.preferences}>
            <img src={img}></img>
            <input
              type="checkbox"
              id={genre.id}
              value={genre.id}
              onChange={handleGenreChange}
            />
            <label htmlFor={genre.id}>{genre.name}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Preferences;

