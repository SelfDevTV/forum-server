import React from "react";
import Forum from "./screens/Forum";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Forum} />
    </Router>
  );
};

export default App;
