import { types } from "../actions";

const user = JSON.parse(localStorage.getItem("user"));

const defaultState = user ? { loggedIn: true, user } : {};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return {
        loggedIn: true,
        user: action.payload
      };
    case types.REGISTER_USER_ERROR:
      alert(action.payload);
      return state;
    default:
      return state;
  }
};

export default authReducer;
