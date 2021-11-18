import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../store/posts"

function AddMOC({ setShowModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [details, setDetails] = useState("");
  // const [errors, setErrors] = useState([]);
  const id = useSelector((state) => state.session.user?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    return dispatch(addPost({ title, imgUrl, details, instructions }, id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Image</label>
      <input
        type="text"
        placeholder="image url"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <br />
      <label>Details</label>
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <br />
      <label>Instructions</label>
      <input
        type="text"
        value={instructions}
        placeholder="image url"
        onChange={(e) => setInstructions(e.target.value)}
      />
      <br />
      <button type="submit">Submit MOC</button>
    </form>
  );
}

export default AddMOC;
