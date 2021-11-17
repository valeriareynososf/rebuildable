import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../store/posts";

function HomePage() {
     const dispatch = useDispatch();
     const post = useSelector((store) => store.postReducer.posts);

     useEffect(() => {
       dispatch(getPosts());
     }, [dispatch]);

  return (
    <div>
      {post !== null ? (
        <>
          {Object.values(post).map((single) => (
            <div key={single.id}>
              <Link key={single.id} to={`/posts/${single.id}`}>
                <img
                  src={single.imgUrl}
                  alt="PostImage"
                />
                <br />
                {single.title}
              </Link>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default HomePage;
