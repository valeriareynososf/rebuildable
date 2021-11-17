import { csrfFetch } from "./csrf";

const ADD_ONE = "single/ADD_ONE";
const EDIT_USER = "single/edit_User";

const oneUser = (user) => ({
  type: ADD_ONE,
  payload: user,
});
const edit_User = (user) => ({
  type: EDIT_USER,
  payload: user,
});

//Thunk action for GET single users
export const singleUser = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}`);
  if (response.ok) {
    const user = await response.json();
    dispatch(oneUser(user));
    // return user
  }
};

//edit
export const editUser = (user, id) => async (dispatch) => {
  const { email, username, imgUrl } = user;
  const response = await csrfFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      username,
      imgUrl,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit_User(data));
    return data;
  }
};

const initialState = {
  main: {},
};

const singleReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_ONE:
      return { ...state, main: action.payload };
    case EDIT_USER: {
      newState = Object.assign({}, state);
      newState.main = {
        ...newState.main,
        [action.payload.id]: action.payload,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default singleReducer;
