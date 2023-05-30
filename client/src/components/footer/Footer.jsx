import styles from './Footer.module.scss'
import { Icon } from "@iconify/react";
const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.icons}>
        <Icon icon="ic:baseline-facebook" />
        <Icon icon="ri:instagram-fill" />
        <Icon icon="ic:baseline-discord" />
        <Icon icon="lucide:twitch" />
      </div>
      <div className={styles.copyright}>© 2023 Enchelon. All rights reserved.</div>
    </div>
  );
}

export default Footer