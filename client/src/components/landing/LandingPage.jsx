
import styles from './Landing.module.scss'
import Navbar from '../navbar/Navbar';


 

  const LandingPage = () => {
  

     
    return (
      <>
        <Navbar className={styles.nav} />

        <div className={styles.landing_container}>
          <div>
            <h1>Game On </h1>
            <p>Discover, Connect, Dominate</p>
          </div>
        </div>
      </>
    );
}

export default LandingPage