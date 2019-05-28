import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./App";

// Setting axios defaults
const user = JSON.parse(localStorage.getItem("user"));

axios.defaults.headers.common["auth-token"] = user ? user.token : "";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
