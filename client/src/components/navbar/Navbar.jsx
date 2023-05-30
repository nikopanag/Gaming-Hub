import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../data/DataContext";
import Logout from "./Logout";
import ProfileCircle from "./ProfileCircle";
import SearchBar from "./SearchBar";
import styles from "./Navbar.module.scss";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { isUserLoggedIn, usersDispatch, user } = useContext(DataContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleProfileMouseEnter = () => {
    setIsProfileDropdownVisible(true);
  };

  const handleProfileMouseLeave = () => {
    setIsProfileDropdownVisible(false);
  };

  const dashboardDropdownStyles = {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    padding: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    display: isDropdownVisible ? "flex" : "none",
    flexDirection: "column",
    zIndex: 1,
  };

  const profileDropdownStyles = {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#fff",
    padding: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    display: isProfileDropdownVisible ? "flex" : "none",
    flexDirection: "column",
    zIndex: 1,
  };

  return (
    <nav className={styles.nav}>
      {!isUserLoggedIn ? (
        <>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={styles.link_items}>
            <Link className={styles.link} to="/explore">
              Explore
            </Link>
            <Link className={styles.link} to="/login">
              Login
            </Link>
            <Link className={styles.link} to="/register">
              Register
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <SearchBar />
          <Link to="/explore">Explore</Link>

          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: "relative" }}>
            <Link to="/dashboard">Dashboard</Link>
            <div style={dashboardDropdownStyles}>
              <Link to="/library">Library</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div>

          <div onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave} style={{ position: "relative" }}>
            <ProfileCircle user={user} />
            <div style={profileDropdownStyles}>
              <Link to="/settings">Settings</Link>
              <Logout usersDispatch={usersDispatch} />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
