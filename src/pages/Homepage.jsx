import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [art, setArt] = useState([]);

  const fetchArt = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`);
      console.log(response);
      if (response.ok) {
        const artData = await response.json();
        console.log(artData);
        setArt(artData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <div>
      <h1> Artwork </h1>
      <ul>
        {art.map((art) => (
          <li key={art._id}>
            <Link to={`/artworks/${art._id}`}>
              <p>{art.title}</p>
              <img className="img" src={art.imageFile} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Homepage;
