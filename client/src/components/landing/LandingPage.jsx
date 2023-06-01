import styles from "./Landing.module.scss";
import Navbar from "../navbar/Navbar";
import Subscription from "../subscription/Subscription";
import { useRef, useEffect } from "react";

const LandingPage = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const handleArrowClick = () => {
    animationRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navbar className={styles.nav} />

      <div className={styles.landing_container}>
        <div className={styles.first}>
          <h1>Game On </h1>
          <p>Discover, Connect, Dominate</p>
          <div onClick={handleArrowClick} className={styles.arrow_container}>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
            <div className={styles.arrow}></div>
          </div>
        </div>
        <div ref={animationRef} className={styles.second}>
          about mission
        </div>
        <div className={styles.third}> something about latest news</div>
        <div className={styles.forth}>
          <Subscription />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
