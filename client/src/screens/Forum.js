import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllForums } from "../actions/forumsActions";
import { register, login } from "../actions/authActions";

const Forum = ({ dispatch }) => {
  return (
    <div>
      <button
        onClick={e =>
          dispatch(
            register("Dominik Huber", "dhuber666@test.com", "abcdefghijkl")
          )
        }
      >
        Register
      </button>
      <button
        onClick={e => dispatch(login("dhuber666@test.com", "abcdefghijkl"))}
      >
        Login
      </button>
      <button onClick={e => dispatch(fetchAllForums())}>Fetch Forums</button>
      <button onClick={e => localStorage.clear("user")}>Logout</button>
    </div>
  );
};

export default connect(
  null,
  null
)(Forum);
