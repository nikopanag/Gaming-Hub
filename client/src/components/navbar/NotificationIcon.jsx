import { AiOutlineBell } from 'react-icons/ai';
import styles from './Navbar.module.scss';

const NotificationIcon = () => {
  return (
    <div className={styles.notification_icon}>
      <AiOutlineBell size={30} />
    </div>
  );
};

export default NotificationIcon;
