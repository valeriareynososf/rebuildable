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

function ProfilePage() {
    const dispatch = useDispatch();
    const { userid } = useParams();
const user = useSelector((state) => state.singleReducer.main);
const posts = useSelector((store) => store.postReducer?.posts);
const id = useSelector((state) => state.session.user?.id);
const [showModal, setShowModal] = useState(false);
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
    <div>
      <div className="profileDivTitle">
        <h2 className="profileHeadline">PROFILE</h2>
      </div>
      <div className="profileContainer">
        <div className="ProfileInfo">
          <img src={user.imgUrl} alt="UserImage" className="profileImg" />
          <br />
          {user.id === id && user.id !== 1 ? (
            <>
              <button onClick={() => setShowModal(true)} className="editProBtn">
                <i className="fas fa-edit"></i> Edit Profile{" "}
              </button>
              {showModal && (
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
                          <Link to={`/posts/${post.id}/edit`} key={post.id} className="updateMocLink">
                            Update MOC
                          </Link>
                          <button onClick={() => deletePostf(post.id)} className="deletePostBtn">
                            delete
                          </button>
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
    </div>
  );
}

export default ProfilePage;
