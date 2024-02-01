import { useContext, useState } from "react";
import SingleCommentEdit from "./SingleCommentEdit";
import { AuthContext } from "../contexts/AuthContext";
import { Box, IconButton } from "@mui/material";
import styles from "../styles/SingleComment.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleComment = ({
  comment,
  handleDelete,
  isEditingGlobal,
  setIsEditingGlobal,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const { userId } = useContext(AuthContext);
  const [showButtons, setShowButtons] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setIsEditingGlobal(true);
  };

  return (
    <>
      {isEditing ? (
        <SingleCommentEdit
          setIsEditing={setIsEditing}
          setIsEditingGlobal={setIsEditingGlobal}
          setCommentContent={setCommentContent}
          commentContent={commentContent}
          commentId={comment._id}
        />
      ) : (
        <Box
          className={styles.comment}
          onMouseEnter={() => {
            setShowButtons(true);
          }}
          onMouseLeave={() => {
            setShowButtons(false);
          }}
        >
          <Box>
            <p className={styles.username}>{comment.user.username}</p>
            <p className={styles.commentContent}>{commentContent}</p>
          </Box>
          {comment.user._id === userId && showButtons && !isEditingGlobal ? (
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
