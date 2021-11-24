import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comments";
import { useParams, useHistory } from "react-router-dom";
import "./homepage.css";

function EditComment() {
  const dispatch = useDispatch();
  const history = useHistory();
    const { commentId } = useParams();
    const comment = useSelector((store) => store.commentReducer.comments?.[commentId]);
  const [content, setContent] = useState(comment?.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editC = dispatch(editComment(content, comment?.id));
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
    <div className="editCommentContainer">
      <form onSubmit={handleSubmit} className="EditCForm">
        <label className="editCTitle">Edit your Comment</label>
        <br />
        <input
          type="text"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="editCInput"
        />
        <br />
        <button type="submit" disabled={errors.length > 0} className="updateCBtn">
          Update Comment
        </button>
      </form>
    </div>
  );
}

export default EditComment;
