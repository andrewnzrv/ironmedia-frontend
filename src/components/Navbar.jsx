import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="main-nav">
        <Link to="/">Homepage</Link>
        <Link to="/add">Add New Artwork</Link>
        <Link to="/about">About us</Link>
      </div>
      <div className="login">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;
