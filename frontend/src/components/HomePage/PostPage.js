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
const [errors, setErrors] = useState([]);
const [showDetails, setShowDetails] = useState("");
const [showInstructions, setShowInstructions] = useState("");
const [showComments, setShowComments] = useState("");
const [showAddComment, setShowAddComment] = useState("");

useEffect(() => {
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

function showAddComments(){
  setShowAddComment(true)
setShowInstructions(false);
setShowDetails(false);
setShowComments(false);
}

function showTheComments() {
  setShowAddComment(false)
  setShowComments(true);
  setShowInstructions(false);
  setShowDetails(false);
}

function hideInstructions(){
  setShowAddComment(false);
  setShowInstructions(false);
  setShowComments(false);
  setShowDetails(true);
}

function hideDetails(){
  setShowAddComment(false);
setShowInstructions(true);
setShowComments(false);
setShowDetails(false);
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
        <h2 className="profileTitle" key={posts.id}>
          {posts.title}
        </h2>
      ) : null}
      <div className="postContainer">
        {posts !== null ? (
          <div key={posts.id}>
            <img src={posts.imgUrl} alt="PostImage" className="PostImage" />
            <br />
            <button onClick={hideInstructions} className="postTabsBtn">
              Details
            </button>
            <button onClick={hideDetails} className="postTabsBtn">
              Instructions
            </button>
            <button onClick={showTheComments} className="postTabsBtn">
              Comments
            </button>
            <button onClick={showAddComments} className="postTabsBtn">
              Add Comment
            </button>
            {showDetails && (
              <div className="addModal">
                <div className="addChannelFormContainer">
                  <p>{posts.details}</p>
                </div>
              </div>
            )}
            {showInstructions && (
              <div className="addModal">
                <div className="addChannelFormContainer">
                  <img
                    src={posts.instructions}
                    alt="LegoInstructions"
                    className="instructionsImage"
                  />
                </div>
              </div>
            )}
          </div>
        ) : null}
        {showAddComment && (
          <div>
            <form onSubmit={handleSubmit}>
              <br />
              <textarea
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
              <br />
              <button type="submit" disabled={errors.length > 0}>
                Add Comment
              </button>
            </form>
          </div>
        )}
        {/* <div>
          <form onSubmit={handleSubmit}>
            <br />
            <textarea
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <button type="submit" disabled={errors.length > 0}>
              Add Comment
            </button>
          </form>
        </div> */}
        <div>
          {comments !== null ? (
            <div>
              {Object.values(comments).map((comment) => (
                <div key={comment.id} className="commentDiv">
                  {showComments && (
                    <div className="addModal">
                      <div className="addChannelFormContainer">
                        <div>{comment.content}</div>
                      </div>
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
                  )}
                  {/* <button onClick={() => setShowComments(true)}>Comments</button>
                  // {showComments && (
                  //   <div className="addModal">
                  //     <div className="addChannelFormContainer">
                  //       <div>{comment.content}</div>
                  //     </div>
                  //   </div>
                  // )} */}
                  {/* {id === comment.user_Id ? (
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
                  ) : null} */}
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
