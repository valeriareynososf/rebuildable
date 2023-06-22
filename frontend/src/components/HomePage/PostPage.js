import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { singlePost, deletePost} from "../../store/posts";
import { getUser } from "../../store/users";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment";
import { postComments, addComment, editComment, deleteComment } from "../../store/comments";
import "./homepage.css";
import { Button,
  Toolbar,
  AppBar,
  Box,
  Typography,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  Paper
} from '@mui/material';



function PostPage() {
const dispatch = useDispatch();
const { postId } = useParams();
const history = useHistory();
const posts = useSelector((store) => store.postReducer?.posts);
const [content, setContent] = useState("");
const comments = useSelector((store) => store.commentReducer.comments);
const user = useSelector((store) => store.userReducer?.users);
const id = useSelector((state) => state.session.user?.id);
// const [showModal, setShowModal] = useState(false);
const [errors, setErrors] = useState([]);
// const [showDetails, setShowDetails] = useState(true);
// const [showInstructions, setShowInstructions] = useState("");
// const [showComments, setShowComments] = useState("");
// const [showAddComment, setShowAddComment] = useState("");
const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

useEffect(() => {
  dispatch(getUser());
  dispatch(singlePost(+postId));
  dispatch(postComments(+postId));
  const errors = [];
  if (!content) errors.push("Title field is required");
  setErrors(errors);
}, [dispatch, postId, content]);

const handleSubmit = (e) => {
  e.preventDefault();
  setContent("");
  return dispatch(addComment(content, postId));
}

// function showAddComments(){
//   setShowAddComment(true)
// setShowInstructions(false);
// setShowDetails(false);
// setShowComments(false);
// }

// function showTheComments() {
//   setShowAddComment(false)
//   setShowComments(true);
//   setShowInstructions(false);
//   setShowDetails(false);
// }

// function hideInstructions(){
//   setShowAddComment(false);
//   setShowInstructions(false);
//   setShowComments(false);
//   setShowDetails(true);
// }

// function hideDetails(){
//   setShowAddComment(false);
// setShowInstructions(true);
// setShowComments(false);
// setShowDetails(false);
// }

function deleteBtn(id){
const deleted = dispatch(deleteComment(id));
if (deleted) {
//  history.push(`/posts/${postId}`);
window.location.reload();
}
}
function deletePostf(id) {
  const deletepost = dispatch(deletePost(id));
  if (deletepost) {
    history.push(`/`);
    window.location.reload();
  }
}
  return (
    <Paper elevation={0} sx={{ minHeight: "850px"}}>
      {posts !== null ? (
        <>
        <Box sx={{ flexGrow: 1, marginLeft: "120px", marginRight:"120px" }}>
          <Toolbar position="static" sx={{backgroundColor:"#ECE288"}}>
          <Typography variant="subtitle1" gutterBottom>
          {posts?.title} by {" "}
             {user !== null ? (
              <> 
                  {Object.values(user).map((poster) => (
                  <span key={poster?.id}>
                    {posts?.userId === poster?.id ? (
                      <Link key={poster?.id} to={`/users/${poster?.id}`} className="titleUsername">
                        {poster?.username}
                      </Link>
                    ) : null}
                  </span>
                ))}
             </>
            ) : null} 
              </Typography>
          </Toolbar>
        </Box>
        </>
      ) : null}
      <Paper elevation={0} sx={{ margin: "60px 200px"}}>
        <Stack sx={{ alignItems: "center", justifyContent:"center"}}>

        {posts !== null ? (
        <Paper elevation={0} sx={{ width: "850px"}}>
            {id === posts?.userId ? (
              <>
                <Link
                  to={`/posts/${posts.id}/edit`}
                  key={posts.id}
                  className="updateMocLink"
                >
                  edit
                </Link>
                <button
                  onClick={() => deletePostf(posts.id)}
                  className="deletePostBtn"
                >
                  delete
                </button>
              </>
            ) : null}
            <br />
            <img src={posts.imgUrl} alt="PostImage" className="PostImage" />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" value={0} />
          <Tab label="Instructions" value={1}/>
          <Tab label="Comments" value={2} />
          <Tab label="Add Comment" value={3} />
        </Tabs>
      </Box>
      <div
      role="tabpanel"
      index={0}
      hidden={value !== 0}
      id={0}
      style={{marginTop:'15px'}}
    >
      <Typography variant="body1" component="h2" sx={{ wordWrap: "word-break", whiteSpace: 'normal' }}>
        
          {posts.details}
      </Typography>
    
      </div>
      <div
      role="tabpanel"
      index={1}
      hidden={value !== 1}
      id={1}
      style={{marginTop:'15px'}}
    >
      <div>
        <img
          src={posts.instructions}
          alt="LegoInstructions"
          style={{width:'650px', height:'480px'}}
          //className="instructionsImage"
           /> 
      </div>
     
      </div>
      <div
      role="tabpanel"
      index={2}
      hidden={value !== 2}
      id={2}
      style={{marginTop:'15px'}}
    >
            <div>
          {comments !== null ? (
            <div className="allComments">
              {Object.values(comments).map((comment) => (
                <div key={comment.id}>
                    <div className="commentDiv">
                      <div className="userInfoC">
                        {user !== null ? (
                          <div>
                            <img
                              src={user[+comment.user_Id]?.imgUrl}
                              alt="userImg"
                              className="userImgPost"
                            />
                            <br />
                            <span>
                              <Link
                                to={`/users/${comment.user_Id}`}
                                className="linkUserNameComment"
                              >
                                {" "}
                                {user[+comment.user_Id]?.username}
                              </Link>
                            </span>
                          </div>
                        ) : null}{" "}
                      </div>
                      <div className="editDeleteBtns">
                        {comment.content}{" "}
                        {id === comment.user_Id ? (
                          <>
                            <Link
                              key={comment.id}
                              to={`/comments/${comment.id}`}
                              className="editCLink"
                            >
                              edit
                            </Link>
                          </>
                        ) : null}
                        {id === comment.user_Id ? (
                          <button
                            onClick={() => deleteBtn(comment.id)}
                            className="deleteCBtn"
                          >
                            delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                 
                </div>
              ))}
              <br />
            </div>
          ) : null}
        </div>
      </div>

      <div
      role="tabpanel"
      index={3}
      hidden={value !== 3}
      id={3}
      style={{marginTop:'15px'}}
    >
      <div>
            <form onSubmit={handleSubmit} className="submitCForm">
              <br />
              <textarea
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
              <br />
              <button
                type="submit"
                disabled={errors.length > 0}
                className="AddCPost"
              >
                Add Comment
              </button>
            </form>
          </div>
      </div>
          </Paper>
        ) : null}
        </Stack>
        </Paper>
    </Paper>
  );
}

export default PostPage;
