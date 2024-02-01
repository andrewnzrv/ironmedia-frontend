import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const API_URL = import.meta.env.VITE_API_URL;

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createArtwork = { title, content, author, imageFile };

    try {
      const response = await fetchWithToken(`/blog`, "POST", createArtwork);
      if (response.status === 201) {
        const artContent = await response.json();
        console.log(artContent);
        navigate(`/`);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <h1 className="main-title">New Artwork</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="file"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png, .jpg, .mp4"
          onChange={(event) => handleFileUpload(event)}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload">
          <Button component="span" variant="outlined" color="primary">
            Upload Image
          </Button>
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{ maxWidth: "100%", marginTop: "8px", borderRadius: "5px" }}
          />
        )}
        <TextField
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "135px", height: "40px" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddContent;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
