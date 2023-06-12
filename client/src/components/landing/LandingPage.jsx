import styles from "./Landing.module.scss";
import Navbar from "../navbar/Navbar";
import Features from "./Features";
import Subscription from "../subscription/Subscription";
import Team from "./Team";
import { useRef, useEffect, useState } from "react";

const LandingPage = () => {
  const animationRef = useRef(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const handleArrowClick = () => {
    animationRef.current.scrollIntoView({ behavior: "smooth" });
  };
     const handleContentChange = () => {
       setShowWelcomeMessage(!showWelcomeMessage);
     };
  return (
    <>
      <Navbar className={styles.nav} />

      <div className={styles.landing_container}>
        <div className={styles.first}>
          {showWelcomeMessage ? (
            <div className={styles.welcome_message}>
              <h1>Game On!</h1>

              <p>
                Welcome to <span>ECHELON</span>, your ultimate destination for gamers to connect, explore, and conquer the virtual realms. We are a passionate
                community-driven platform dedicated to empowering gamers worldwide. Whether you're a casual player or an avid enthusiast, our website is
                designed to enhance your gaming experience and keep you up-to-date with the latest news, releases, and more.
              </p>
            </div>
          ) : (
            <div className={styles.welcome}>
              <h1>Game On</h1>
              <p>Discover, Connect, Dominate</p>
              <div onClick={handleArrowClick} className={styles.arrow_container}>
                <div className={styles.arrow}></div>
                <div className={styles.arrow}></div>
                <div className={styles.arrow}></div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.content_switch}>
          <button onClick={() => handleContentChange(true)}>1.</button>
          <button onClick={() => handleContentChange(false)}>2.</button>
        </div>
        <div ref={animationRef} className={styles.second}>
          <Features />
        </div>
        <div className={styles.third}>
          {" "}
          <Team />
        </div>
        <div className={styles.forth}>
          <Subscription />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
