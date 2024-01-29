import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";

const ArtworkDetailPage = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState();
  const { fetchWithToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/${artworkId}`
        ); /*/api/art */
        if (response.ok) {
          const artworkData = await response.json();
          setArtwork(artworkData);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/blog/${artworkId}`, "DELETE");
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {artwork ? (
        <>
          <h1>{artwork.title}</h1>
          <img className="img" src={artwork.imageFile} />
          <p>{artwork.content}</p>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>

          <Link to={`/artworks/${artwork._id}/update`}>
            <button type="button">Update</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArtworkDetailPage;
