import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { authToken, username } = useContext(AuthContext);
  console.log("authToken:", authToken);
  console.log("username:", username);

  return (
    <div className="navbar">
      <div className="main-nav">
        <Link to="/">Homepage</Link>
        <Link to="/add">Add New Artwork</Link>
        <Link to="/about">About us</Link>
      </div>
      <div className="login">
        {authToken ? (
          <span>Welcome, {username}!</span>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
