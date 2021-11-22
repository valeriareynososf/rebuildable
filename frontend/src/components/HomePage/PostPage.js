import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { singlePost } from "../../store/posts";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment";
import { postComments, addComment, editComment, deleteComment } from "../../store/comments";
import "./homepage.css";

function PostPage() {
const dispatch = useDispatch();
const { postId } = useParams();
const history = useHistory();
const posts = useSelector((store) => store.postReducer?.posts);
const [content, setContent] = useState("");
const comments = useSelector((store) => store.commentReducer.comments);
const id = useSelector((state) => state.session.user?.id);
const [showModal, setShowModal] = useState(false);
// const [errors, setErrors] = useState([]);

useEffect(() => {
  dispatch(singlePost(+postId));
  dispatch(postComments(+postId));
}, [dispatch, postId]);

const handleSubmit = (e) => {
  e.preventDefault();
  setContent("");
  return dispatch(addComment(content, postId));
}

function deleteBtn(id){
const deleted = dispatch(deleteComment(id));
if (deleted) {
//  history.push(`/posts/${postId}`);
window.location.reload();
}
}

  return (
    <div>
      {posts !== null ? (
          <h2 className="profileTitle" key={posts.id}>{posts.title}</h2>
    ) : null}
      <div className="postContainer">
        {posts !== null ? (
          <div key={posts.id}>
            {/* <h2 className="profileTitle">{posts.title}</h2> */}
            <img src={posts.imgUrl} alt="PostImage" className="PostImage" />
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
            <div>
              {Object.values(comments).map((comment) => (
                <div key={comment.id} className="commentDiv">
                  {comment.content}
                  {id === comment.user_Id ? (
                    <>
                      <Link key={comment.id} to={`/comments/${comment.id}`}>
                        Edit Comment
                      </Link>
                    </>
                  ) : null}
                  {id === comment.user_Id ? (
                    <button onClick={() => deleteBtn(comment.id)}>
                      delete
                    </button>
                  ) : null}
                </div>
              ))}
              <br />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
