import { useContext, useState } from "react";
import SingleCommentEdit from "./SingleCommentEdit";
import { AuthContext } from "../contexts/AuthContext";

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
        <div>
          <p>
            {comment.user.username}: {commentContent}
          </p>
          {comment.user._id === userId ? (
            <div>
              <button type="button" onClick={() => handleDelete(comment._id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(comment._id)}>
                Edit
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default SingleComment;
