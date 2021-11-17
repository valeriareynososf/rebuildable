import { csrfFetch } from "./csrf";

const LOAD = "users/LOAD";

const load = (users, id) => ({
  type: LOAD,
  payload: users,
  id,
});

//Thunk action for GET users
export const getUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/users");
  const users = await response.json();
  dispatch(load(users));
  return response;
};

const initialState = { users: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allUsers = {};
      const users = Object.values(action.payload);
      users.forEach((user) => {
        allUsers[user.id] = user;
      });
      return {
        ...state,
        users: { ...allUsers },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
