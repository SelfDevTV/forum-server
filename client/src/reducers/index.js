import { combineReducers } from "redux";
import forumsReducer from "./forumsReducer";
import authReducer from "./authReducer";

export default combineReducers({ forums: forumsReducer, user: authReducer });
