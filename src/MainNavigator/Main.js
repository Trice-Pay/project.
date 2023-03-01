import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, isReadyRef } from "./RootNavigation";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { genAccessToken } from "../redux/actions/users.actions";

const Stack = createNativeStackNavigator();

const Main = () => {
  const [defaultRoute, setDefaultRoute] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const GenAccessToken = async () => {
    const refreshtoken = await AsyncStorage.getItem("refresh_Access_Token");
    if (refreshtoken) {
      dispatch(genAccessToken({ refreshToken: refreshtoken })).then((res) => {
        if (res && res.res?.accessToken) {
          AsyncStorage.setItem("access_token", res?.accessToken);
        }
      });
    }
  };

  useEffect(() => {
    GenAccessToken();
  }, []);

  const processInitialAction = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const pin = await AsyncStorage.getItem("Pin");
    const refreshtoken = await AsyncStorage.getItem("refresh_Access_Token");
    console.log(
      pin,
      token,
      "token--",
      refreshtoken,
      "refresh--",
      "firstrender"
    );

    if (pin) {
      if (token && refreshtoken) {
        setDefaultRoute("Dashboard");
        setIsChecked(true);
      } else {
        setDefaultRoute("Auth");
        setIsChecked(true);
      }
    } else {
      setDefaultRoute("Auth");
      setIsChecked(true);
    }

    setIsChecked(true);
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  };

  useEffect(() => {
    processInitialAction();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  if (!isChecked) return null;

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <Stack.Navigator
          initialRouteName={defaultRoute}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};
export default Main;
