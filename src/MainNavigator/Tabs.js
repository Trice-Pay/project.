import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionHistory from '../Screens/Dashboard/History';
import Settings from '../Screens/Dashboard/Settings';
import { Images } from '../Res/Images';
import { colors } from '../Res/Colors';
import Merchant from '../Screens/Dashboard/Merchant';
import { Fonts } from '../Res';
import FirstTab from './AddWalletStack';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (
        <>
            <View style={{ flex: 1 }}>
                <Tab.Navigator
                 initialRouteName='FirstTab'
                    screenOptions={{
                        tabBarActiveTintColor: colors.white,
                        tabBarInactiveTintColor: '#FFFFFF',
                        tabBarActiveBackgroundColor: colors.darkblue,
                        tabBarStyle: {
    
                            backgroundColor: '#35469E',
                            elevation: 0, // for Android
                            shadowOffset: {
                                width: 0,
                                height: 0, // for iOS
                            },
                            alignItems: "center", justifyContent: "center",
                        },
                         tabBarLabelStyle:{paddingBottom:3,fontSize:11,fontFamily:Fonts.SourceSansProRegular}
                    }}>
                    <Tab.Screen
                        name="FirstTab"
                        component={FirstTab}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Wallet',
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    color={color}
                                    source={Images.wallet}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Merchants"
                        component={Merchant}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Marchant',
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    color={color}
                                    source={Images.merchants}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="TransactionHistory"
                        component={TransactionHistory}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'History',
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    color={color}
                                    source={Images.history}

                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    color={color}
                                    source={Images.user}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        </>
    );
}
