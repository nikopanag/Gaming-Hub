import { useReducer, useEffect, createContext, useState } from 'react';
import { usersInitialState, usersReducer } from './usersReducer';

import { getUser } from '../api/userApiCalls';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //! User State
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  useEffect(() => {
    getUser(usersDispatch);
  }, []);

  const { user, isUserLoggedIn } = usersState;

  return (
    <DataContext.Provider
      value={{
        user,
        isUserLoggedIn,
        usersDispatch,
        error,
        loading,
        setError,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;