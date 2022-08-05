import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.js.jsx";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import reducerSeatsList from "./Redux/seatsList";

import backgroundImage from "./Assets/Images/bgmovie.jpg";
import reducerUsersList from "./Redux/usersList";

const rootReducer = combineReducers({
  seatsList: reducerSeatsList,
  usersList: reducerUsersList,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

document.getElementById("root").style.cssText = `
  position: relative;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
  background-position: center;
`;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
