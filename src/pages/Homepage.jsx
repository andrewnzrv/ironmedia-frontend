import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Homepage = () => {

    const [artwork, setArtwork] = useState([])

    const fetchArtwork = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}`) /*/api/art */

            if(response.ok)
            {
                const artworkData = await response.json()
                console.log(artworkData)
                setArtwork(artworkData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArtwork()
    }, [])

    return (
    <div>
      <h1>Artwork from Users</h1>
      <ul>
        {artwork.map(artwork => (
            <li key={artwork._id}>
                <Link to={`/artwork/${artwork._id}`}>
                    <p>{artwork.title}</p>
                </Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
