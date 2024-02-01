import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Box, IconButton, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import styles from "../styles/SingleCommentEdit.module.css";

const SingleCommentEdit = ({
  setIsEditing,
  setIsEditingGlobal,
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
        setIsEditingGlobal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form className="form" onSubmit={handleSubmit}>
        <Box className={styles.editComment}>
          <TextField
            id="standard-basic"
            variant="standard"
            name="editComment"
            type="text"
            value={commentContent}
            onChange={handleInput}
          />
          <IconButton
            className={styles.saveBtn}
            size="small"
            aria-label="save"
            type="submit"
          >
            <SaveIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default SingleCommentEdit;
