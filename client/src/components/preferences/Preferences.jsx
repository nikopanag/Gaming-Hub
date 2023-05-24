import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePreferences } from '../../api/userApiCalls';

const Preferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = [
    'Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 
    'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Massively Multiplayer', 
    'Racing', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card'
  ];
  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, e.target.value]);
    } else {
      setSelectedGenres(selectedGenres.filter(genre => genre !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await updatePreferences(selectedGenres);
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
          <div key={genre}>
            <input type="checkbox" id={genre} value={genre} onChange={handleGenreChange} />
            <label htmlFor={genre}>{genre}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Preferences;

