import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../store/posts";
import "./homepage.css";

function HomePage() {
     const dispatch = useDispatch();
     const post = useSelector((store) => store.postReducer.posts);

     useEffect(() => {
       dispatch(getPosts());
     }, [dispatch]);

  return (
    <div className="allPostsContainer">
      {post !== null ? (
        <>
          {Object.values(post).map((single) => (
            <div key={single.id} className="postsDiv">
              <Link key={single.id} to={`/posts/${single.id}`}>
                {single.title}
                <br />
                <img src={single.imgUrl} alt="PostImage" className="legoImg" />
              </Link>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default HomePage;
