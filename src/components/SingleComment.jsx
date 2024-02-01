import { useContext, useState } from "react";
import SingleCommentEdit from "./SingleCommentEdit";
import { AuthContext } from "../contexts/AuthContext";
import { Box, IconButton } from "@mui/material";
import styles from "../styles/SingleComment.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
            <p className={styles.username}>{comment.user.username}</p>
            <p className={styles.commentContent}>{commentContent}</p>
          </Box>
          {comment.user._id === userId ? (
            <Box className={styles.buttons}>
              <IconButton
                size="small"
                aria-label="edit"
                type="button"
                onClick={() => handleEdit(comment._id)}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                type="button"
                onClick={() => handleDelete(comment._id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default SingleComment;
