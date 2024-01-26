import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ArtworkDetailPage = () => {
  const { artworkId } = useParams();
  const [artwork, setArtworkId] = useState();
  const { fetchWithToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}`
        ); /*/api/art */
        if (response.ok) {
          const artworkData = await response.json();
          setBook(artworkData);
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
      const response = await fetchWithToken(`${artworkId}`, "DELETE");
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>ART WORK DETAILS</h1>
      <p>{artwork.title}</p>
      <p>{artwork.content}</p>
      <p>{artwork.author}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default ArtworkDetailPage;
