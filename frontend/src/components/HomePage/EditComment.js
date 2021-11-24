import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comments";
import { useParams, useHistory } from "react-router-dom";

function EditComment() {
  const dispatch = useDispatch();
  const history = useHistory();
    const { commentId } = useParams();
    const comment = useSelector((store) => store.commentReducer.comments?.[commentId]);
  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editC = dispatch(editComment(content, comment.id));
    if (editC) {
      history.push(`/`);
    }
  };
  useEffect(() => {
    const errors = [];
    if (!content) errors.push("Name field is required");
    setErrors(errors);
  }, [content]);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Edit your Comment</label>
        <br />
        <input
          type="text"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit" disabled={errors.length > 0}>
          Update Comment
        </button>
      </form>
    </>
  );
}

export default EditComment;
