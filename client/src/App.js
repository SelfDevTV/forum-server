import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    axios.defaults.baseURL = "http://localhost:5000";

    axios
      .post("/api/user/register", {
        name: "Hubsi",
        email: "dhuber333@gmail.com",
        password: "123456"
      })
      .then(data => console.log("juhu data, ", data))
      .catch(err => console.warn("Oh no error", err));
  }
  render() {
    return (
      <div className="App">
        <h2>Hello</h2>
      </div>
    );
  }
}

export default App;
