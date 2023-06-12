import styles from "./Landing.module.scss";
import { Icon } from "@iconify/react";

const contributors = [
  {
    name: "Mihaela",
    role: "Frontend Developer",
    photo: "/assets/miha (1).jpg",
    github: "https://github.com/m89mihaella",
    linkedIn: "https://www.linkedin.com/in/mihaela-melnic/",
    insta: "",
  },
  {
    name: "Niko",
    role: "Fullstack Developer",
   photo: "/assets/niko.jpg",
    github: "https://github.com/https://github.com/nikopanag",
    linkedIn: "https://www.linkedin.com/in/nikolaos-panagiotidis/",
    insta: "",
  },
];

const Team = () => {
  return (
    <div className={styles.team}>
      <h2>Meet the Team</h2>
      <div className={styles.team_container}>
        {contributors.map((contributor, idx) => (
          <div className={styles.team_card} key={idx}>
            <div className={styles.info}>
              <img src={contributor.photo} alt={contributor.name} />
              <h3>{contributor.name}</h3>
              <p>{contributor.role}</p>
            </div>
            <ul className={styles.social}>
              <li>
                <Icon icon="mdi:github" />
              </li>
              <li>
                <Icon icon="entypo-social:linkedin-with-circle" />
              </li>
              <li>
                <Icon icon="ri:instagram-line" />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
