import { types } from "./";
import axios from "axios";

export const register = (name, email, password) => {
  return dispatch => {
    axios
      .post("http://localhost:5000/api/user/register", {
        name,
        email,
        password
      })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        return dispatch({ type: types.REGISTER_USER, payload: data });
      })
      .catch(err =>
        dispatch({ type: types.REGISTER_USER_ERROR, payload: err })
      );
  };
};
