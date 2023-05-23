import { useState } from 'react';
import { searchGames } from '../../api/gameApiCalls';
import styles from './Navbar.module.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    try {
      const response = await searchGames(query);
      console.log(response);

      if (response.status === 200) {
        // Handle the response data here
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.search_bar}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
