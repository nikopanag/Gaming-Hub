import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';
import { logout } from '../../api/userApiCalls';
import styles from './Navbar.module.scss';

const Logout = () => {
  const { usersDispatch } = useContext(DataContext);

  const handleLogout = async () => {
    try {
      await logout(usersDispatch);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout} className={styles.logout}>Logout</button>;
};

export default Logout;
