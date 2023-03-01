import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Screens/Auth/onboarding';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import VerifyEmail from '../Screens/Auth/VerifyEmail';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import ChangePassword from '../Screens/Dashboard/ChangePasword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmPin from '../Screens/Dashboard/Confirmpin';
import PinView from '../Screens/Dashboard/PinView';


const AuthStack = createNativeStackNavigator();


const Auth = () => {
    const [defaultRoute, setDefaultRoute] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    // const { type } = route?.params || {}

    const processInitialAction = async () => {
        const pin = await AsyncStorage.getItem('Pin')
        const token = await AsyncStorage.getItem('access_token')
        const refreshtoken = await AsyncStorage.getItem('refresh_Access_Token') 
        if (token && refreshtoken) {
            if (!pin) {
                setDefaultRoute('BottomTabs')
                setIsChecked(true)
            }
            else {
                setDefaultRoute('onboarding')
                setIsChecked(true)

            }
        }
        else {
            setDefaultRoute('onboarding')
            setIsChecked(true)
        }
    }

    useEffect(() => {
        processInitialAction()
    }, [])


    if (!isChecked) return null

    return (
        <>
            <AuthStack.Navigator
                initialRouteName={defaultRoute}
                screenOptions={{
                    headerShown: false
                }}>
                <AuthStack.Screen
                    name="onboarding"
                    component={Onboarding}
                />
                <AuthStack.Screen
                    name="Login"
                    component={Login}
                />
                <AuthStack.Screen
                    name="Register"
                    component={Register}
                />
                <AuthStack.Screen
                    name="VerifyEmail"
                    component={VerifyEmail}
                />
                <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <AuthStack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                />
                <AuthStack.Screen
                    name="PinView"
                    component={PinView}
                />
                {/* <AuthStack.Screen
                    name="ConfirmPin"
                    component={ConfirmPin}
                    options={{ animation: "none" }}
                /> */}
            </AuthStack.Navigator>
        </>
    )

}
export default Auth