import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import ArtCard from "../components/ArtCard";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import ProfileCard from "../components/ProfileCard";
import Masonry from "@mui/lab/Masonry";

function UserArtPage() {
  const [userArt, setUserArt] = useState([]);
  const { username } = useContext(AuthContext);
  const { userId } = useParams();
  console.log({ userId });

  const fetchUserArt = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/art`
      );
      console.log(response);
      if (response.ok) {
        const userArtData = await response.json();
        console.log(userArtData);
        setUserArt(userArtData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserArt();
  }, [userId]);

  return (
    <Container maxWidth="xl" className="container">
      <div className="cnt">
        <h1 className="main-title">{`${username}'s Art Collection`}</h1>
        <div>
          <Grid container spacing={3}>
            <Masonry columns={4} spacing={1}>
              {userArt.map((art) => (
                <Grid
                  key={art._id}
                  xs={12}
                  md={4}
                  lg={3}
                  style={{ marginTop: 40 }}
                >
                  <Link to={`/artworks/${art._id}`}>
                    <ProfileCard art={art} />
                  </Link>
                </Grid>
              ))}
            </Masonry>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default UserArtPage;
