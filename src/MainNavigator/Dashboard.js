/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './Tabs.js';
import AddToken from '../Screens/Dashboard/AddToken.js';
import GenerateWallet from '../Screens/Dashboard/GenerateWallet.js';
import ImportWallet from '../Screens/Dashboard/ImportWallet.js';
import RecoveryPharse from '../Screens/Dashboard/RecoveryPharse.js';
import CustomToken from '../Screens/Dashboard/CustomToken.js';
import VerifyMnemonic from '../Screens/Dashboard/VerifyMnemonic.js';
import PrivateKey from '../Screens/Dashboard/PrivateKey.js';
import BitcoinDetail from '../Screens/Dashboard/BitcoinDetail.js';
import SendBitcoin from '../Screens/Dashboard/SendBitcoin.js';
import ConfirmSend from '../Screens/Dashboard/ConfirmSend.js';
import CompleteTrans from '../Screens/Dashboard/CompleteTrans.js';
import Scanner from '../Screens/Dashboard/Scanner.js';
import ChangePassword from '../Screens/Dashboard/ChangePasword.js';
import Notification from '../Screens/Dashboard/notification.js';
import MyProfile from '../Screens/Dashboard/EditProfile/index.js';
import Enable2FA from '../Screens/Dashboard/Enable2FA/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Pin from '../Screens/Dashboard/Pin.js';
import Crypto_currencies from '../Screens/Dashboard/Crypto_Currencies';
import Transaction from '../Screens/Dashboard/Transactions.js';
import EditWallet from '../Screens/Dashboard/Editwallet.js';
import Wallet from '../Screens/Dashboard/Wallet';
import SelectNetwork from '../Screens/Dashboard/SelectNetwork.js';

const Stack = createNativeStackNavigator();

const Dashboard = ({ route, navigation }) => {
  const [defaultRoute, setDefaultRoute] = useState('')
  const [isChecked, setIsChecked] = useState(false)


  const processInitialAction = async () => {
    const enable2FA = await AsyncStorage.getItem('2FA_check')
    const verify_user = await AsyncStorage.getItem('verify_user')
 
    if (JSON.parse(enable2FA)) {
      if (JSON.parse(verify_user)) {
        setDefaultRoute('BottomTabs')
        setIsChecked(true)
      }
      setDefaultRoute('Enable2FA')
      setIsChecked(true)
    }
    else {
      setDefaultRoute('BottomTabs')
      setIsChecked(true)
    }
  }

  useEffect(() => {
    processInitialAction()
  }, [])


  if (!isChecked) return null

  return (
    <Stack.Navigator
      initialRouteName={defaultRoute}
      screenOptions={{
        headerShown: false
      }} >
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        name="AddToken"
        component={AddToken}
      />
      <Stack.Screen
        name="GenerateWallet"
        component={GenerateWallet}
      />
      <Stack.Screen
        name="ImportWallet"
        component={ImportWallet}
      />
      <Stack.Screen
        name="RecoveryPharse"
        component={RecoveryPharse}
      />
      <Stack.Screen
        name="CustomToken"
        component={CustomToken}
      />
      <Stack.Screen
        name="VerifyMnemonic"
        component={VerifyMnemonic}
      />
      <Stack.Screen
        name="PrivateKey"
        component={PrivateKey}
      />
      <Stack.Screen
        name="BitcoinDetail"
        component={BitcoinDetail}
      />
      <Stack.Screen
        name="SendBitcoin"
        component={SendBitcoin}
      />
      <Stack.Screen
        name="ConfirmSend"
        component={ConfirmSend}
      />
      <Stack.Screen
        name="CompleteTrans"
        component={CompleteTrans}
      />
      <Stack.Screen
                    name="Wallet"
                    component={Wallet}
                />
      <Stack.Screen
        name="notification"
        component={Notification}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        name="Enable2FA"
        component={Enable2FA}
      />
      <Stack.Screen
        name="Pin"
        component={Pin}
      />
        <Stack.Screen
        name="crypto_currencies"
        component={Crypto_currencies}
      />
         <Stack.Screen
        name="Transaction"
        component={Transaction}
      />
        <Stack.Screen
        name="EditWallet"
        component={EditWallet}
      />
        <Stack.Screen
        name="SelectNetwork"
        component={SelectNetwork}
      />
    </Stack.Navigator>
  );
}

export default Dashboard;
