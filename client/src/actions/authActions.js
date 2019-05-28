import { types } from "./";
import axios from "axios";

export const register = (name, email, password) => {
  return dispatch => {
    axios
      .post("/api/user/register", {
        name,
        email,
        password
      })
      .then(({ data }) => {
        // TODO: Make another function for registerin the user
        localStorage.setItem("user", JSON.stringify(data));
        return dispatch({ type: types.REGISTER_USER, payload: data });
      })
      .catch(err =>
        dispatch({ type: types.REGISTER_USER_ERROR, payload: err })
      );
  };
};
