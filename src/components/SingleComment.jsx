const SingleComment = ({ comment, handleDelete }) => {
  return (
    <>
      <p>
        {comment.user.username}: {comment.content}
      </p>
      <button type="button" onClick={() => handleDelete(comment._id)}>
        Delete
      </button>
    </>
  );
};

export default SingleComment;
