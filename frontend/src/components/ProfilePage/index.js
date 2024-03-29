import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleUser } from "../../store/singleUser";
import { getUser } from "../../store/users";
import { userPosts, deletePost } from "../../store/posts";
import { Modal } from "../../context/Modal";
import UpdateBuild from "../ProfilePage/UpdateMOC"
import EditProfile from "../ProfilePage/editProfile"
import "./profile.css";

import { Button,
  Toolbar,
  AppBar,
  Box,
  Typography,
  InputAdornment,
  Stack,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

function ProfilePage() {
    const dispatch = useDispatch();
    const { userid } = useParams();
const user = useSelector((state) => state.singleReducer.main);
const posts = useSelector((store) => store.postReducer?.posts);
const id = useSelector((state) => state.session.user?.id);
const [showModal, setShowModal] = useState(false);
const [profModal, setProfModal] = useState(false);
const [mocModal, setMOCModal] = useState(false);
const [postId, setPostId] = useState(false);
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
//const [showDelete, setShowDelete] = useState("");
//   const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      dispatch(singleUser(userid));
      //dispatch(getUser());
      if (user.id) {
        dispatch(userPosts(user.id));
      }
    }, [dispatch, userid, user.id]);

    if (!posts){
        return null
    }
function deletePostf(id){
const deletepost = dispatch(deletePost(id));
if (deletepost) {
  window.location.reload();
}
}

  return (
    <Paper elevation={0} sx={{height: "950px"}}>
       <Box sx={{ flexGrow: 1, marginLeft: "120px", marginRight:"120px" }}>
          <Toolbar position="static" sx={{backgroundColor:"#ECE288"}}>
          <Typography variant="h5" gutterBottom>
          PROFILE of {user.username}
          </Typography>
          </Toolbar>
        </Box>
      <div className="profileContainer">
        <div className="ProfileInfo">
          <img src={user.imgUrl} alt="UserImage" className="profileImg" />
          <br />
          {user.id === id && user.id !== 1 ? (
            <>
              <button onClick={() => {setShowModal(true); setProfModal(true)}} className="editProBtn">
                <i className="fas fa-edit"></i> Edit Profile{" "}
              </button>
              {showModal && profModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <EditProfile setShowModal={setShowModal} user={user} />
                </Modal>
              )}
            </>
          ) : null}
          <br />
          <span className="profileUsername">{user.username}</span>
          <br />
        </div>
        <div className="profilePostDiv">
          {posts !== null ? (
            <>
              {Object.values(posts).map((post) => (
                <div key={post.id} className="insidePostdiv">
                  {post.userId === user.id ? (
                    <>
                      <img
                        src={post.imgUrl}
                        alt="PostImage"
                        className="postImg"
                      />
                      <br />
                      <Link
                        key={post.id}
                        to={`/posts/${post.id}`}
                        className="postTitleLink"
                      >
                        {post.title}
                      </Link>
                      <br/>
                      {id === post.userId ? (
                        <>
                <button onClick={() => {setShowModal(true); setMOCModal(true); setPostId(post.id)}} className="editMocBtn">
              edit
              </button>
              {showModal && mocModal && (
                <Modal onClose={() => {setShowModal(false); setMOCModal(false);} }>
                  <UpdateBuild setShowModal={setShowModal} postId={postId} />
                </Modal>
              )}
                          <button 
                          onClick={()=>{setOpen(true);setPostId(post.id)}}
                          // onClick={() => deletePostf(post.id)} 
                          className="deletePostBtn"
                          >
                            delete
                          </button>
                          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This post will be deleted permanently. You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deletePostf(postId)} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </Paper>
  );
}

export default ProfilePage;
