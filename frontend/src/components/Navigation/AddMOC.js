import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../store/posts"
import "./Navigation.css";

function AddMOC({ setShowModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState([]);

  const id = useSelector((state) => state.session.user?.id);
  
  useEffect(() => {
    const errors = [];
    if (!title) errors.push("Title field is required");
    if (!imgUrl) errors.push("A url to the image is required");
    if (!details) errors.push("Detail field is required");
    if (!instructions) errors.push("A url to the instructions is required");
    setErrors(errors);
  }, [title, imgUrl, details, instructions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    return dispatch(addPost({ title, imgUrl, details, instructions }, id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="addMocForm">
        {/* <label>Title</label> */}
        <div className="submitMocFormTitle">SUBMIT MOC</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="addMocInput"
        />
        <br />
        {/* <label>Image</label> */}
        <input
          type="text"
          placeholder="Image url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="addMocInput"
        />
        <br />
        {/* <label>Details</label> */}
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
          className="addMocInput"
        />
        <br />
        {/* <label>Instructions</label> */}
        <input
          type="text"
          value={instructions}
          placeholder="Image url"
          onChange={(e) => setInstructions(e.target.value)}
          className="addMocInput"
        />
        <br />
        <button
          type="submit"
          disabled={errors.length > 0}
          className="submitMocBtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMOC;
