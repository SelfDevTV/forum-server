import React from "react";
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    axios
      .post("http://localhost:5000/api/user/register", {
        name: "Hubsif",
        email: "dhuber33ff3@gmail.com",
        password: "1234ff56"
      })
      .then(data => console.log("juhu data, ", data))
      .catch(err => console.warn(err.response.data));
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
