import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";
import CommentSection from "../components/CommentSection";
import { Box, Container } from "@mui/material";
import styles from "../styles/ContentDetail.module.css";

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
          <Container maxWidth="xl" className="container">
            <Box className={styles.pageContent}>
              <Box className={styles.artwork}>
                <img className={styles.img} src={artwork.imageFile} />
                <Box className={styles.artworkInfo}>
                  <p className={styles.author}>{artwork.author.username}</p>
                  <h1>{artwork.title}</h1>
                  <p>{artwork.content}</p>
                </Box>
                {artwork.author._id === userId ? (
                  <Box className={styles.artworkButtons}>
                    <Button
                      variant="outlined"
                      color="error"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>

                    <Link to={`/artworks/${artwork._id}/update`}>
                      <Button variant="contained" type="button">
                        Update
                      </Button>
                    </Link>
                  </Box>
                ) : null}
              </Box>
              <Box className={styles.comments}>
                <CommentSection artwork={artwork} />
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArtworkDetailPage;
