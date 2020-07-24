import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  //   <App />,
  document.getElementById("root")
);
