import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SingleCommentEdit = ({
  setIsEditing,
  commentContent,
  setCommentContent,
  commentId,
}) => {
  const { fetchWithToken } = useContext(AuthContext);
  const handleInput = (event) => setCommentContent(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchWithToken(`/comments/${commentId}`, "PUT", {
        content: commentContent,
      });
      if (response.status === 200) {
        setCommentContent(commentContent);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="editComment"
          type="text"
          value={commentContent}
          onChange={handleInput}
        ></input>
        <button className="input-btn" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default SingleCommentEdit;
