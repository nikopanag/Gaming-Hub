import { useState } from "react";
import styles from "./Subscription.module.scss";
import { Icon } from "@iconify/react";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className={styles.subscribe}>
      <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <input name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">Email</label>
          </div>
          <button className={styles.button} type="submit">
            SUBSCRIBE <Icon className={styles.icon} icon="iconoir:fast-arrow-right" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Subscription;
