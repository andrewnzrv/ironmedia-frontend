import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Avatar } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { red, blueGrey } from "@mui/material/colors";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ArtCard = ({ art }) => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  /*  console.log(art); */

  return (
    <div>
      <Card
        sx={{
          borderRadius: "20px",
          backgroundColor: "white",
          //border: "1px solid #3399ff",
        }}
      >
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: blueGrey[300] }}></Avatar>}
          action={<IconButton></IconButton>} //add icon if u want
          title={
            <span style={{ color: "black", fontSize: "0.9rem" }}>
              {art.title}
            </span>
          }
          subheader={
            <span style={{ color: "black", opacity: "0.7" }}>
              {" "}
              {art.author.username}
            </span>
          }
        />
        <CardMedia
          component="img"
          height="300"
          image={art.imageFile}
        ></CardMedia>
      </Card>
    </div>
  );
};

export default ArtCard;
