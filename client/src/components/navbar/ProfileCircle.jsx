import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';
import { useNavigate } from "react-router-dom";

import styles from './Navbar.module.scss';

const ProfileCircle = () => {
  const { user } = useContext(DataContext);
    const navigate = useNavigate();

  const userInitial = user?.username?.[0]?.toUpperCase();
  const goToProfile = () => {
    navigate("/profile");

  };
  return (
    <div onClick={goToProfile} className={styles.profile_circle}>
      {userInitial}
    </div>
  );
};

export default ProfileCircle;

