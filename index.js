/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./src/App";
import { Provider } from "react-redux";
import Store from "./src/redux/store";

const store = Store;

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
