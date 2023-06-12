import styles from './Landing.module.scss'
const Features = () => {
  const featuresContent = [
    {
      title: "Track and Organize",
      description:
        "Seamlessly keep track of your favorite games, create personalized collections, and organize your gaming library all in one place. Easily manage and update your gaming profile with our intuitive interface.",
    },
    {
      title: "Wishlist and Collection",
      description:
        "Build your dream gaming wishlist and track upcoming releases. Mark games as owned or completed, and showcase your gaming achievements to the world. Connect with fellow gamers, share recommendations, and discover hidden gems.",
    },

   
    {
      title: "Discover New Games",
      description:
        "Stay ahead of the curve with our comprehensive database of new releases, gaming trends, and industry news. Explore curated lists, in-depth reviews, and recommendations to find your next gaming adventure.",
    },
    {
      title: "News and Updates",
      description:'Dive into the gaming world with our timely news articles, updates, and interviews. Get the latest insights on gaming events, patches, expansions, and more. Stay informed and engaged with the gaming community.'
    },
    {
      title: "Personalized Recommendations",
      description:'Leverage our intelligent recommendation system to discover games tailored to your preferences. Our algorithm analyzes your gaming history and preferences to provide personalized suggestions, ensuring you never miss out on a captivating gaming experience.'
    },
    {
      title: "Connect with the Community",
      description:'Connect with like-minded gamers through forums, chat features, and social profiles. Share your experiences, exchange tips and tricks, and participate in lively discussions.'
    }

  ];

  return (
    <>
      <div className={styles.description}>
        <img src="/assets/3.jpg" alt="" />
       
        <p>
          Our mission is to provide gamers with a comprehensive and immersive platform that caters to their diverse needs. We aim to foster a vibrant and
          inclusive gaming community where players can discover new games, track their favorites, expand their collections, and stay informed about the gaming
          industry. We strive to empower gamers to unleash their true potential and create unforgettable gaming experiences.
        </p>
      </div>
      <div className={styles.mission}></div>
      <div className={styles.features}>
        <h2>Key Features</h2>
        <ul>
          {featuresContent.map((feature, idx) => (
            <li key={idx}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Features;