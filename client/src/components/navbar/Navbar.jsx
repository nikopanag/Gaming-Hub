import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../data/DataContext';
import Logout from './Logout';
import ProfileCircle from './ProfileCircle';
import NotificationIcon from './NotificationIcon';
import SearchBar from './SearchBar';
import styles from './Navbar.module.scss';


const Navbar = () => {
  const { isUserLoggedIn, usersDispatch, user } = useContext(DataContext);

  return (
    <nav className={styles.nav}>
      <SearchBar />
      {!isUserLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Logout usersDispatch={usersDispatch} />
          <ProfileCircle user={user} />
          <NotificationIcon />
        </>
      )}
    </nav>
  );
};

export default Navbar;












