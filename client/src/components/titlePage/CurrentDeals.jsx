import axios from 'axios';
import { useEffect, useState } from 'react';

const CurrentDeals = ({ gameTitle }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`/games/prices?gameTitle=${gameTitle}`);
        setDeals(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals();
  }, [gameTitle]);

  return (
    <div>
      <h2>Current Deals</h2>
      {deals.map((deal, index) => (
        <div key={index}>
          <p>{deal.shop.name}: {deal.price_new}</p>
        </div>
      ))}
    </div>
  );
};

export default CurrentDeals;


