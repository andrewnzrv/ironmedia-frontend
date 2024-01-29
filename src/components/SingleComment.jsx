import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SingleComment = ({ comment, setCommentUpdated }) => {
  const { fetchWithToken, userId } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(
        `/comments/${comment._id}`,
        "DELETE"
      );
      if (response.status === 204) {
        setCommentUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>
        {comment.user.username}: {comment.content}
      </p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default SingleComment;
