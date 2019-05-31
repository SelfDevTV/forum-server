import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllForums } from "../actions/forumsActions";
import { register, login } from "../actions/authActions";
import axios from "axios";
import { Link } from "react-router-dom";

const Forum = ({ dispatch }) => {
  const handleSignIn = () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };

  const me = () => {
    axios
      .get("/api/user/me", { withCredentials: true })
      .then(({ data }) => console.log(data));
  };

  const logout = () => {
    axios.get("/api/auth/logout", { withCredentials: true });
  };
  return (
    <div>
      <button onClick={handleSignIn}>Login</button>
      <button onClick={me}>Me</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default connect(
  null,
  null
)(Forum);
