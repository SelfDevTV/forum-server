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
  return (
    <div>
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
};

export default connect(
  null,
  null
)(Forum);
