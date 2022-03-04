import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
//import { BrowserRouter, HashRouter } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./services/store";

// const isProduction = process.env.NODE_ENV === 'production';
// const Router: typeof HashRouter = isProduction ? HashRouter : BrowserRouter;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/react-burger">
      <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
