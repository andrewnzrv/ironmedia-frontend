import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("username this is:", username);

  return (
    <div className="navbar">
      <div className="main-nav">
        <Link to="/">Homepage</Link>
        <Link to="/add">Add New Artwork</Link>
        <Link to="/about">About us</Link>
      </div>
      <div className="login">
        {isAuthenticated ? (
          <span>Welcome, {username}!</span>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
