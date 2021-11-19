import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comments";

function EditComment({ comment, setShowModal }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    return dispatch(editComment(content, comment.id));
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