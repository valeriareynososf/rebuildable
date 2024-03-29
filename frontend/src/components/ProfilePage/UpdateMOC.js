import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editPost } from "../../store/posts";
import "./profile.css";
import { 
  Paper
} from '@mui/material';

const UpdateBuild = ({ setShowModal, postId })=> {

  const dispatch = useDispatch();
  //  const { postId } = useParams();
    const history = useHistory();
    const post = useSelector((store) => store.postReducer?.posts?.[postId] || store.postReducer?.posts);
  const [title, setTitle] = useState(post?.title);
  const [imgUrl, setImgUrl] = useState(post?.imgUrl);
  const [instructions, setInstructions] = useState(post?.instructions);
  const [details, setDetails] = useState(post?.details);
  
  // const [errors, setErrors] = useState([]);
  //const id = useSelector((state) => state.session.user?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editp = dispatch(editPost({ title, imgUrl, details, instructions }, postId));
    if (editp){
      history.push(`/posts/${postId}`);
      setShowModal(false);
    }
  };

  return (
    <Paper elevation={0} >
    <form onSubmit={handleSubmit} className="updateMocForm">
      <label>Title </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="inputForm"
      />
      <br />
      <label>Image</label>
      <input
        type="text"
        placeholder="image url"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
        className="inputForm"
      />
      <br />
      <label>Details</label>
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="inputForm"
      />
      <br />
      <label>Instructions</label>
      <input
        type="text"
        value={instructions}
        placeholder="image url"
        onChange={(e) => setInstructions(e.target.value)}
        className="inputForm"
      />
      <br />
      <button type="submit" className="submitMocBtn">
        Update MOC
      </button>
    </form>
    </Paper>
  );
}

export default UpdateBuild;
