import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { singlePost } from "../../store/posts";

function PostPage() {
    const dispatch = useDispatch();
     const { postId } = useParams();
      const posts = useSelector((store) => store.postReducer?.posts);

useEffect(() => {
  dispatch(singlePost(+postId));
}, [dispatch, postId]);

  return (
    <div>
      {posts !== null ? (
        <div key={posts.id}>
          <h2>{posts.title}</h2>
          <img src={posts.imgUrl} alt="PostImage" />
          <p>{posts.details}</p>
          <img src={posts.instructions} alt="LegoInstructions" />
        </div>
      ) : null}
    </div>
  );
}

export default PostPage;
