import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const signup = async (dispatch, data) => {
  const { username, email, password } = data;
  try {
    const response = await axios.post('/auth/register', {
      username,
      email,
      password,
    });

    dispatch({ type: 'LOGIN', payload: response.data.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.message });
    return error.response.data;
  }
};

export const login = async (dispatch, data) => {
  const { email, password } = data;
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });

    dispatch({ type: 'LOGIN', payload: response.data.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.message });
    return error.response.data;
  }
};

export const getUser = async (dispatch) => {
  try {
    const response = await axios.get('/me');

    dispatch({ type: 'LOGIN', payload: response.data.data });
    // return response.data.data;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: 'LOGOUT' });
    // return error.response.data;
  }
};

export const logout = async (usersDispatch) => {
  try {
    await axios.get('/auth/logout');
    usersDispatch({ type: 'LOGOUT' });
  } catch (error) {
    usersDispatch({ type: 'LOGOUT' });
  }
};

export const updateUser = async (dispatch, data) => {
  try {
    const response = await axios.patch('/me', data);
    dispatch({ type: 'UPDATE_USER', payload: response.data.data });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updatePreferences = async (selectedGenres) => {
    try {
      const response = await axios.put('/me/preferences', { preferences: selectedGenres });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };