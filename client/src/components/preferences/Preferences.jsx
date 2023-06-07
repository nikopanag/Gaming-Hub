import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePreferences } from "../../api/userApiCalls";
import styles from "./Preferences.module.scss";

const Preferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genres = [
    { id: 4, name: "Action", img: "../../../assets/action.webp" },
    { id: 51, name: "Indie", img: "../../../assets/indie.png" },
    { id: 3, name: "Adventure", img: "../../../assets/adventure.jpg" },
    { id: 5, name: "RPG", img: "../../../assets/rpg.jpg" },
    { id: 10, name: "Strategy", img: "../../../assets/strategy.jpg" },
    { id: 2, name: "Shooter", img: "../../../assets/shooter.jpg" },
    { id: 40, name: "Casual", img: "../../../assets/casual.jpg" },
    { id: 14, name: "Simulation", img: "../../../assets/simulation.jpg" },
    { id: 7, name: "Puzzle", img: "../../../assets/puzzle.jpg" },
    { id: 11, name: "Arcade", img: "../../../assets/arcade.jpg" },
    {
      id: 83, name: "Platformer", img: "../../../assets/platformer.jpg" },
    {
      id: 59, name: "Massively Multiplayer", img: "../../../assets/massive.webp" },
    { id: 1, name: "Racing", img: "../../../assets/racing.avif" },
    { id: 15, name: "Sports", img: "../../../assets/sports.jpg" },
    { id: 6, name: "Fighting", img: "../../../assets/fighting.jpg" },
    { id: 19, name: "Family", img: "../../../assets/family.webp" },
    { id: 28, name: "Board Games", img: "../../../assets/board.jpg" },
    { id: 34, name: "Educational", img: "../../../assets/edu.jpg" },
    { id: 17, name: "Card", img: "../../../assets/card.jpg" },
  ];

  const navigate = useNavigate();

  const handleGenreChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const genreIds = selectedGenres.map((genre) => genre);
      console.log(selectedGenres);
      const response = await updatePreferences(genreIds);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.preferences_container}>
      <h2>Select your preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.genres_container}>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`${styles.preferences} ${selectedGenres.includes(genre.id) ? styles.selected : ""}`}
              onClick={() => handleGenreChange(genre.id)}
            >
              <img src={genre.img} alt={genre.name} />
              <input type="checkbox" id={genre.id} value={genre.id} onChange={(e) => handleGenreChange(e, genre.id)} />
              <label htmlFor={genre.id}>{genre.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Preferences;
