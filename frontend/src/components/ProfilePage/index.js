import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleUser } from "../../store/singleuser";
import { getUser } from "../../store/users";
import { userPosts } from "../../store/posts"
import { Modal } from "../../context/Modal";
import UpdateBuild from "../ProfilePage/UpdateMOC"
import "./profile.css";

function ProfilePage() {
    const dispatch = useDispatch();
    const { userid } = useParams();
const user = useSelector((state) => state.singleReducer.main);
const posts = useSelector((store) => store.postReducer?.posts);
const id = useSelector((state) => state.session.user?.id);
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

  return (
    <div>
      <h2>Profile</h2>
      <img src={user.imgUrl} alt="UserImage" className="profileImg" />
      <br />
      {user.username}
      {user.id === id && user.id !== 1 ? (
        <>
          {/* <Link to={`/artists/${id}/edit`} key={id}>
              edit profile
            </Link> */}
          <button>Edit your Profile</button>
          {/* {showEdit ? <EditProfile user={user} close={setShowEdit} /> : null} */}
        </>
      ) : null}
      <div>
        {posts !== null ? (
          <>
            {Object.values(posts).map((post) => (
              <div key={post.id}>
                {post.userId === user.id ? (
                  <>
                    <img
                      src={post.imgUrl}
                      alt="PostImage"
                      className="postImg"
                    />
                    <Link key={post.id} to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                    {id === post.userId ? (
                      <>
                        <Link
                          to={`/posts/${post.id}/edit`}
                          key={post.id}>
                          Update MOC
                        </Link>
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
  );
}

export default ProfilePage;
