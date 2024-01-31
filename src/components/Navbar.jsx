import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";
import styles from "../styles/Nav.module.css";

const Navbar = () => {
  const { isAuthenticated, username, logout, userId } = useContext(AuthContext);


  return (
    <div className="navbar">
      <div className="main-nav">
        <Link className={styles.navLink} to="/">
          Homepage
        </Link>
        <Link className={styles.navLink} to="/add">
          Add New Artwork
        </Link>
        <Link className={styles.navLink} to="/about">
          About us
        </Link>
      </div>
      <div className="login">
        {isAuthenticated ? (
          <div>
            <Link to={`/${userId}/art`}>
              <span className="welcome-text">Welcome, {username}!</span>
            </Link>
            <Button
              type="button"
              variant="outlined"
              onClick={logout}
              style={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outlined" style={{ textTransform: "none" }}>
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
