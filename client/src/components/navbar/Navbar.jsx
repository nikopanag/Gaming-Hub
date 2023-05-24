import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../data/DataContext";
import Logout from "./Logout";
import ProfileCircle from "./ProfileCircle";
import SearchBar from "./SearchBar";
import styles from "./Navbar.module.scss";

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
          <h1>Logo</h1>
          <Link to="/explore">Explore</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <h1>Logo</h1>
          <SearchBar />
          <Link to="/explore">Explore</Link>

          <Link to="/dashboard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: "relative" }}>
            Dashboard
            <div style={dashboardDropdownStyles}>
              <Link to="/library">Library</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </Link>

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
