import { useContext, useState } from "react";
import SingleCommentEdit from "./SingleCommentEdit";
import { AuthContext } from "../contexts/AuthContext";
import { Box } from "@mui/material";
import styles from "../styles/SingleComment.module.css";

const SingleComment = ({ comment, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const { userId } = useContext(AuthContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <SingleCommentEdit
          setIsEditing={setIsEditing}
          setCommentContent={setCommentContent}
          commentContent={commentContent}
          commentId={comment._id}
        />
      ) : (
        <Box className={styles.comment}>
          <Box>
            <p>
              {comment.user.username}: {commentContent}
            </p>
          </Box>
          {comment.user._id === userId ? (
            <Box>
              <button type="button" onClick={() => handleDelete(comment._id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(comment._id)}>
                Edit
              </button>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default SingleComment;
