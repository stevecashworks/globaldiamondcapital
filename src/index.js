import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutingComponent from "./router";
import { Provider } from "react-redux";
import store from "./state/store";
import { PersistGate } from 'redux-persist/integration/react';
import {persistor} from './state/store';

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <RoutingComponent />
    </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
