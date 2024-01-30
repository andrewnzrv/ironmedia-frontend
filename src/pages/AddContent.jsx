import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Added state for content
  const [author, setAuthor] = useState("");
  const [imageFile, setPostImage] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createArtwork = { title, content, author, imageFile };

    try {
      const response = await fetchWithToken(
        `/blog`, // Fixed API URL
        "POST",
        createArtwork
      );
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
    console.log(base64);
    setPostImage(base64);
  };

  return (
    <>
      <Container maxWidth="xl" className="container">
        <Navbar />
        <h1>New Artwork</h1>
        <form
          onSubmit={handleSubmit}
          action="submit"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="image">Image</label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(event) => handleFileUpload(event)}
          />
          <label htmlFor="content">Content:</label> {/* Added content input */}
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </Container>
    </>
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
