import React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { Grid, Container } from "@mui/material";

const ProfileCard = ({ art }) => {
  return (
    <Container maxWidth="xl" className="container">
      <img
        src={art.imageFile}
        alt={art.title}
        loading="lazy"
        style={{
          borderRadius: 20,
          display: "block",
          width: "100%",
        }}
      />
    </Container>
  );
};

export default ProfileCard;
