import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../store/posts";
import { getUser } from "../../store/users";
import "./homepage.css";

function HomePage() {
     const dispatch = useDispatch();
     const post = useSelector((store) => store.postReducer?.posts);
     const users = useSelector((store) => store.userReducer?.users);
     useEffect(() => {
    dispatch(getUser());
       dispatch(getPosts());
     }, [dispatch]);

  return (
    <div className="allPostsContainer">
      {post !== null ? (
        <>
          {Object.values(post).map((single) => (
            <div key={single.id} className="postsDiv">
              <Link key={single.id} to={`/posts/${single.id}`} className="postTitle">
                <img src={single.imgUrl} alt="PostImage" className="legoImg" />
                <br />
                 {single.title}
              </Link>
              <br />
              by{" "}
              {users !== null ? (
                <>
                  {Object.values(users).map((user) => (
                    <span key={user.id}>
                      {single.userId === user.id ? (
                        <Link key={user.id} to={`/users/${user.id}`} className="byUserLink">
                          {user.username}
                        </Link>
                      ) : null}
                    </span>
                  ))}
                </>
              ) : null}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default HomePage;
