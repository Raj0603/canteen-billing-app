import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import store from './Store'
import {positions, transitions, Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const options = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition: transitions.FADE
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AlertProvider>
  </Provider>
);
