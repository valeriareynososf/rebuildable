import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { singlePost } from "../../store/posts";
import { postComments, addComment } from "../../store/comments";

function PostPage() {
    const dispatch = useDispatch();
     const { postId } = useParams();
      const posts = useSelector((store) => store.postReducer?.posts);
const [content, setContent] = useState("");
const comments = useSelector((store) => store.commentReducer.comments);
// const [errors, setErrors] = useState([]);

useEffect(() => {
  dispatch(singlePost(+postId));
  dispatch(postComments(+postId));
}, [dispatch, postId]);

const handleSubmit = (e) => {
  e.preventDefault();
  return dispatch(addComment(content, postId));
}

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
      <div>
        <form onSubmit={handleSubmit}>
          <br />
          <textarea
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button
            type="submit"
            // disabled={errors.length > 0}
          >
            Add Comment
          </button>
        </form>
      </div>
      <div>
        {comments !== null ? ( 
          <>
          {Object.values(comments).map((comment) => (
            <>
 {comment.content}
 </>
           ))}
           </>
          ) : null}
      </div>
    </div>
  );
}

export default PostPage;
