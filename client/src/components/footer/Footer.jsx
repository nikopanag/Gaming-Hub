import styles from "./Footer.module.scss";
import { Icon } from "@iconify/react";

const Footer = () => {

  return (
    <div className={styles.footer_container}>
      <div className={styles.icons}>
        <Icon className={styles.icons_link} icon="ic:baseline-facebook" />
        <Icon className={styles.icons_link} icon="ri:instagram-fill" />
        <Icon className={styles.icons_link} icon="ic:baseline-discord" />
        <Icon className={styles.icons_link} icon="lucide:twitch" />
      </div>
      <div className={styles.copyright}>© 2023 Enchelon. All rights reserved.</div>
    </div>
  );
};

export default Footer;
