import { types } from "../actions";

const defaultState = [];

const forumsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_FORUMS:
      console.log(action.payload);
      return state;
    case types.FETCH_FORUMS_ERROR:
      alert(action.payload);
      return state;
    default:
      return state;
  }
};

export default forumsReducer;
