import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.get("/api/product/brands").then((response) => {
      console.log(response);
    });
  }

  state = {};
  render() {
    return <div className="App">myApp</div>;
  }
}

export default App;
