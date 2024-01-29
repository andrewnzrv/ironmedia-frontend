import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";

const ArtworkUpdatePage = () => {
  const { artworkId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setPostImage] = useState("");

  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOneArtwork = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/${artworkId}`
        ); /*/api/art */
        if (response.ok) {
          const artworkData = await response.json();
          setTitle(artworkData.title);
          setContent(artworkData.content);
          setAuthor(artworkData.author);
          setPostImage(artworkData.imageFile);
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
  };

  return (
    <>
      <h1>Update ARTWORK</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
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

        <button type="submit">Update</button>
      </form>
    </>
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
