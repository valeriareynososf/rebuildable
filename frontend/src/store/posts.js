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