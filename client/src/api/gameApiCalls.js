import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const searchGames = async (query) => {
  try {
    const response = await axios.get(`/games/search?title=${query}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHotGamesThisWeek = async () => {
  try {
    const response = await axios.get('/games/hotthisweek');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching hot games of the week:', error);
    throw error;
  }
};

export const getLast30DaysReleases = async () => {
  try {
    const response = await axios.get('/games/lastthirtydays');
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUpcomingGamesNextWeek = async () => {
  try {
    const response = await axios.get('/games/nextweek');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching next week releases:', error);
    throw error;
  }
};

export const getReleaseCalendar = async ({ month, year }) => {
  try {
    const response = await axios.get(`/games/release-calendar?month=${month}&year=${year}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const response = await axios.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game by id:', error);
    throw error;
  }
};

export const getGenreBasedRecommendations = async () => {
  try {
    const response = await axios.get('/games/recommendations');
    console.log('Recommendations:', response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

