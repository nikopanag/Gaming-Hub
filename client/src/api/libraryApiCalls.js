import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const addGameToLibrary = async (gameId,title,image) => {
  try {
    const response = await axios.post(`/library`, { gameId,title,image });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeGameFromLibrary = async (gameId) => {
  try {
    const response = await axios.delete(`/library`, { data: { gameId } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserLibrary = async () => {
  try {
    const response = await axios.get(`/library`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
