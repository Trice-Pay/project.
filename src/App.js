import React, { useEffect } from "react";
import Main from "./MainNavigator/Main";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const App = ({ navigation }) => {
  return (
    <>
      <Main />
    </>
  );
};

export default App;
