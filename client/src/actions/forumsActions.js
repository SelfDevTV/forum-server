import { types } from "./index";
import axios from "axios";

export const fetchAllForums = () => {
  return dispatch => {
    axios
      .get("http://localhost:5000/api/forums/all")
      .then(({ data }) => dispatch({ type: types.FETCH_FORUMS, payload: data }))
      .catch(err => dispatch({ type: types.FETCH_FORUMS_ERROR, payload: err }));
  };
};
