import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import EditInventory from "./Components/EditInventory/index";
import reportWebVitals from "./reportWebVitals";
import SignUp from "./Components/SignUp/index";
import SignIn from "./Components/SignIn/index";
require("react-web-vector-icons/fonts");

ReactDOM.render(
  <React.StrictMode>
    <EditInventory />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
