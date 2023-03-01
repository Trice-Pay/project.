
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddWallet from '../Screens/Dashboard/AddWallet';
import Wallet from '../Screens/Dashboard/Wallet'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const FirstTab = () => {
    const Stack = createNativeStackNavigator();
    const isFocused=useIsFocused()
    const [defaultroute, setDefaultRoute] = useState('AddWallet')
    const [isChecked, setIsChecked] = useState(false)

    const processInitialAction = async () => {
       var getAddress=[]
         getAddress = JSON.parse( await AsyncStorage.getItem('walletInfoList'))
         console.log("LIST->>>>>>>>>",getAddress)
        console.log("STATE",defaultroute)
        setDefaultRoute(getAddress ? "Wallet" : "AddWallet")
        console.log("CHANGE",defaultroute)
        setIsChecked(true)
        console.log("checked",isChecked);
    }
 
    useEffect(() => {
        processInitialAction()
    }, [isFocused])

    if (!isChecked) return null
    return (
        <>
            <Stack.Navigator
                initialRouteName={defaultroute}
                screenOptions={{
                    headerShown: false,
                    animation: "none"
                }}  >
                      <Stack.Screen
                    name="Wallet"
                    component={Wallet}
                />
                <Stack.Screen
                    name="AddWallet"
                    component={AddWallet}
                />
              
            </Stack.Navigator>
        </>

    )

}
export default FirstTab

