import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // allow us to include cookies

export const addGameToWishlist = async (gameId, title, image) => {
  try {
    const response = await axios.post("/wishlist", { gameId, title, image });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeGameFromWishlist = async (gameId) => {
  try {
    const response = await axios.delete(`/wishlist`, { data: { gameId } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserWishlist = async () => {
  try {
    const response = await axios.get(`/wishlist`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
