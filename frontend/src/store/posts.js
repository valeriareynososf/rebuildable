import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const ADD_POST = "posts/add_post";
const ONE_POST = "posts/single_post";
const REMOVE_ITEM = "posts/REMOVE_ITEM";

const load = (songs, userId) => ({
  type: LOAD,
  payload: songs,
  userId,
});

const add_post = (post) => ({
  type: ADD_POST,
  payload: post,
});

const single_post = (post) => ({
  type: ONE_POST,
  payload: post,
});

const remove = (post) => ({
  type: REMOVE_ITEM,
  payload: post,
});

//get all posts
export const getPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts");
  const posts = await response.json();
  dispatch(load(posts));
  return response;
};

//get single post
export const singlePost = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}`);
  const posts = await response.json();
  dispatch(single_post(posts));
  return response;
};


export const userPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/posts`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts, id));
  }
}

//add post
export const addPost = (post, id) => async (dispatch) => {
  const { title, imgUrl, details, instructions } = post;
  const response = await csrfFetch(`/api/users/${id}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      imgUrl,
      details,
      instructions,
    }),
  });
  const data = await response.json();
  dispatch(add_post(data));
  return response;
};

//edit a post
export const editPost = (post, id) => async (dispatch) => {
  const { title, imgUrl, details, instructions } = post;
  const response = await csrfFetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      imgUrl,
      details,
      instructions,
    }),
  });
  if (response.ok) {
  const data = await response.json();
  dispatch(add_post(data));
  return data;
  }
};

//delete a post
export const deletePost = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}`, {
    method: "delete"});
  if (response.ok) {
  const data = await response.json();
  dispatch(remove(data));
  return data;
  }
};

const initialState = { posts: null };

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD: {
      const allPosts = {};
      const posts = Object.values(action.payload);
      posts.forEach((post) => {
        allPosts[post.id] = post;
      });
      return {
        ...state,
        posts: { ...allPosts },
      };
    }
    case ONE_POST: {
      return { ...state, posts: action.payload };
    }
    case REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.post];
      return newState;
    }
    case ADD_POST:
      newState = Object.assign({}, state);
      newState.posts = {
        ...newState.posts,
        [action.payload.id]: action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export default postReducer;