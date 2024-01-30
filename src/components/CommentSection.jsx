import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";
import { AuthContext } from "../contexts/AuthContext";

const CommentSection = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();
  const blogPost = artworkId;
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog/${artworkId}`
        );
        if (response.ok) {
          const artworkData = await response.json();
          setArtwork(artworkData);
          setComments(artworkData.comments);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createComment = { blogPost, content };

    try {
      const response = await fetchWithToken(`/comments`, "POST", createComment);
      if (response.status === 201) {
        const newComment = await response.json();
        setComments((comments) => [...comments, newComment]);
        setContent("");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentIdToDelete) => {
    try {
      const response = await fetchWithToken(
        `/comments/${commentIdToDelete}`,
        "DELETE"
      );
      if (response.status === 204) {
        setComments((comments) =>
          comments.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error + "ddsdasd");
    }
  };

  return (
    <>
      {artwork ? (
        <>
          <form
            onSubmit={handleSubmit}
            action="submit"
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <label htmlFor="comment">Comment:</label>{" "}
            {/* Added content input */}
            <textarea
              id="comment"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <button type="submit">SUBMIT</button>
          </form>

          {comments.map((comment) => (
            <SingleComment
              key={comment._id}
              comment={comment}
              handleDelete={handleDelete}
            />
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CommentSection;
