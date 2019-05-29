import { types } from "./index";
import axios from "axios";
import setHeader from "../helpers/setHeader";

// TODO: Do we really need to set  the header, since everyone can read the forum without the need to be authenticated
export const fetchAllForums = () => {
  return dispatch => {
    axios
      .get("/api/forums/all", setHeader())
      .then(({ data }) => dispatch({ type: types.FETCH_FORUMS, payload: data }))
      .catch(err =>
        dispatch({ type: types.FETCH_FORUMS_ERROR, payload: err.response.data })
      );
  };
};
