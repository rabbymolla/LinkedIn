import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import firebaseConfig from "./DatabseConnection/firebaseConfig.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Feature/Store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
