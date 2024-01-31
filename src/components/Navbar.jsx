import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";

const Navbar = () => {
  const { isAuthenticated, username, logout, userId } = useContext(AuthContext);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("username this is:", username);
  console.log("user id this is:", userId);

  return (
    <div className="navbar">
      <div className="main-nav">
        <Link to="/">Homepage</Link>
        <Link to="/add">Add New Artwork</Link>
        <Link to="/about">About us</Link>
      </div>
      <div className="login">
        {isAuthenticated ? (
          <div>
            <span className="welcome-text">Welcome, {username}!</span>
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
