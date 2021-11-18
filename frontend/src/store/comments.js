import { csrfFetch } from "./csrf";

const LOAD = "comments/LOAD";
const ADD_COMMENT = "comments/ADD_COMMENT";
const ONE_COMMENT = "comments/ONE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const load = (comments, userId) => ({
  type: LOAD,
  payload: comments,
  userId,
});

const add_comment = (comments) => ({
  type: ADD_COMMENT,
  payload: comments,
});

const single_comment = (comments) => ({
  type: ONE_COMMENT,
  payload: comments,
});

const remove = (comments) => ({
  type: REMOVE_COMMENT,
  payload: comments,
});

//get all comments
export const getComments = () => async (dispatch) => {
  const response = await csrfFetch("/api/comments");
  const comments = await response.json();
  dispatch(load(comments));
  return response;
};

//get comments from posts
export const postComments = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/comments`);
  const comments = await response.json();
  dispatch(load(comments));
  return response;
};

//get single comment
export const singleComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`);
  const comments = await response.json();
  dispatch(single_comment(comments));
  return response;
};

//get users comments
export const usersComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/comments`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments, id));
  }
};

//add comment
export const addComment = (content, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({
      content,
    }),
  });
  const data = await response.json();
  dispatch(add_comment(data));
  return response;
};

//edit a comment
export const editComment = (content, id) => async (dispatch) => {
  //   const { content } = comment;
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      content,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(add_comment(data));
    return data;
  }
};

//delete a comment
export const deleteComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(remove(data));
    return data;
  }
};

const initialState = { comments: null };

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD: {
      const allComments = {};
      const comments = Object.values(action.payload);
      comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return {
        ...state,
        comments: { ...allComments },
      };
    }
    case ONE_COMMENT: {
      return { ...state, main: action.payload };
    }
    case REMOVE_COMMENT: {
      const newState = { ...state };
      delete newState[action.comment];
      return newState;
    }
    case ADD_COMMENT:
      newState = Object.assign({}, state);
      newState.comments = {
        ...newState.comments,
        [action.payload.id]: action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
