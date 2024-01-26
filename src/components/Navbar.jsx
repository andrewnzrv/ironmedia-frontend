import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/">Homepage</Link>
            <Link to="/add">Add New Artwork</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/about">About us</Link>
        </div>
      );
}
 
export default Navbar