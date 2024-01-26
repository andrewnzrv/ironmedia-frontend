import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Added state for content
  const [author, setAuthor] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createArtwork = { title, content, author };

    try {
      const response = await fetchWithToken(
        `/blog-posts`, // Fixed API URL
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

  return (
    <>
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
    </>
  );
};

export default AddContent;
