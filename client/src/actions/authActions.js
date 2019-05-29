import { types } from "./";
import axios from "axios";
import setHeader from "../helpers/setHeader";

export const register = (name, email, password) => {
  return dispatch => {
    axios
      .post(
        "/api/user/register",
        {
          name,
          email,
          password
        },
        setHeader()
      )
      .then(({ data }) => {
        // TODO: Make another function for registerin the user
        localStorage.setItem("user", JSON.stringify(data));
        return dispatch({ type: types.REGISTER_USER, payload: data });
      })
      .catch(err =>
        dispatch({
          type: types.REGISTER_USER_ERROR,
          payload: err.response.data
        })
      );
  };
};

export const login = (email, password) => {
  return dispatch => {
    axios
      .post(
        "/api/user/login",
        {
          email,
          password
        },
        setHeader()
      )
      .then(({ data }) => {
        // TODO: Make another function for registerin the user
        localStorage.setItem("user", JSON.stringify({ token: data }));
        return dispatch({ type: types.LOGIN_USER, payload: data });
      })
      .catch(err =>
        dispatch({
          type: types.LOGIN_USER_ERROR,
          payload: err.response.data
        })
      );
  };
};
