import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';
import styles from './Navbar.module.scss';

const ProfileCircle = () => {
  const { user } = useContext(DataContext);
  const userInitial = user?.username?.[0]?.toUpperCase();

  return (
    <div className={styles.profile_circle}>
      {userInitial}
    </div>
  );
};

export default ProfileCircle;

