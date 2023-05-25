import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserWishlist } from '../../api/wishlistApiCalls'
import Sidebar from './Sidebar'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getUserWishlist()
        setWishlist(response.wishlist)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWishlist()
  }, [])

  return (
    <>
      <Sidebar />
      <div>
        <h2>Wishlist</h2>
        {wishlist.map((game, index) => (
          <div key={index}>
            <h3>
              <Link to={`/games/${game.gameId}`}>{game.title}</Link>
            </h3>
            <img src={game.image} alt="" />
          </div>
        ))}
      </div>
    </>
  )
}

export default Wishlist