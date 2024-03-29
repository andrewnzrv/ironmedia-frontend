import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Skeleton } from "@mui/material";
import ArtCard from "../components/ArtCard";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Homepage() {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, username, logout, userId } = useContext(AuthContext);

  const fetchArt = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`);
      console.log(response);
      if (response.ok) {
        const artData = await response.json();
        //console.log(artData);
        setArt(artData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <Container maxWidth="xl" className="container">
      <div className="cnt">
        <h1 className="main-title">InfiniteCanvas</h1>
        <div>
          <Grid container spacing={3}>
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <Grid item key={index} xs={12} md={6} lg={4}>
                    <Skeleton
                      sx={{ height: 500, borderRadius: 5 }}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={300}
                    />
                  </Grid>
                ))
              : art.map((art) => (
                  <Grid item key={art._id} xs={12} md={6} lg={4}>
                    <Link to={`/artworks/${art._id}`}>
                      <ArtCard art={art} />
                    </Link>
                  </Grid>
                ))}
          </Grid>
        </div>
      </div>
    </Container>
  );
}
export default Homepage;
