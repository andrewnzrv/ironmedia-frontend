import React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

const ProfileCard = ({ art }) => {
  return (
    <Box sx={{ width: 400 }}>
      <Masonry columns={3} spacing={2}>
        <img
          srcSet={art.imageFile}
          src={art.imageFile}
          alt={art.title}
          loading="lazy"
          style={{
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            display: "block",
            width: "100%",
          }}
        />
      </Masonry>
    </Box>
  );
};

export default ProfileCard;
