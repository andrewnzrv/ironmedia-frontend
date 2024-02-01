import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

const ArtworkUpdatePage = () => {
  const { artworkId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview

  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOneArtwork = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/${artworkId}`
        );
        if (response.ok) {
          const artworkData = await response.json();
          setTitle(artworkData.title);
          setContent(artworkData.content);
          setAuthor(artworkData.author);
          setPostImage(artworkData.imageFile);
          setImagePreview(
            URL.createObjectURL(
              new Blob([atob(artworkData.imageFile.split(",")[1])], {
                type: "image/jpeg",
              })
            )
          );
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOneArtwork();
  }, [artworkId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchWithToken(`/blog/${artworkId}`, "PUT", {
        title,
        content,
        author,
        imageFile,
      });
      if (response.status === 200) {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
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
      <h1 className="main-title">Update Artwork</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ mb: 2 }}
        />
        <label htmlFor="file-upload">
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(event) => handleFileUpload(event)}
            style={{ display: "none" }}
          />
          <Button
            component="span"
            variant="outlined"
            color="primary"
            sx={{ mb: 2 }}
          >
            Change Image
          </Button>
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt=""
            style={{ maxWidth: "100%", marginTop: "8px" }}
          />
        )}

        <TextField
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "135px", height: "40px" }}
        >
          Update
        </Button>
      </form>
    </Container>
  );
};

export default ArtworkUpdatePage;

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
