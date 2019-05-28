import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllForums } from "../actions/forumsActions";
import { register } from "../actions/authActions";

const Forum = ({ dispatch }) => {
  useEffect(() => {
    dispatch(fetchAllForums());
  }, [dispatch]);

  return (
    <button
      onClick={e =>
        dispatch(
          register("Dominik Huber", "dhuber666@test.com", "abcdefghijkl")
        )
      }
    >
      Register
    </button>
  );
};

export default connect(
  null,
  null
)(Forum);
