import React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

const ProfileCard = ({ art }) => {
  return (
    <Masonry columns={3} spacing={3} defaultHeight={450}>
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
    </Masonry>
  );
};

export default ProfileCard;
