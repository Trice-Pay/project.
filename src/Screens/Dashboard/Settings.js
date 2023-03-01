import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, StatusBar, FlatList, Switch, Share } from 'react-native';
import { CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from '../../MainNavigator/RootNavigation'
import { getProfile } from '../../redux/actions/needs.actions';
import { useDispatch, } from 'react-redux'
import Toast from 'react-native-toast-message';

const Settings = ({ navigation }) => {
    const dispatch = useDispatch()
    const [profile, setprofile] = useState()

    const getInitialData = async () => {
        dispatch(getProfile()).then(res => {
            const user = res?.payload?.data?.user
            user.map(i => setprofile(i))
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getInitialData()
        });
        return unsubscribe;

    }, [navigation])


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: profile?.referralCode,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(result.activityType)
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {

                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const Data = [
        {
            id: 1,
            heading: "Profile Information",
            icon: Images.profile,
            text: "Change your account information",
        },
        {
            id: 2,
            heading: "Change Password",
            icon: Images.lockdark,
            text: "Change your password",
        },
        {
            id: 3,
            heading: "Networks",
            icon: Images.walletdark,
            text: "Choose Networks for your assets",
        },
        {
            id: 4,
            heading: "Enable 2FA",
            icon: Images.phone,
            text: "Enable 2FA",
        },
        {
            id: 5,
            heading: "Refer to Friends",
            icon: Images.arrowicon,
            text: "",
        },

    ];
    const on_click = (item) => {
        if (item.heading == 'Change Password') {
            navigation.navigate('ChangePassword', { type: 'changepassword' })
        }
        else if (item.heading == 'Enable 2FA') {
            if (profile?.is2faEnabled == 1) {
                Toast.show({
                    type: "error",
                    text1: "you have already enable 2FA",
                })
            }
            else {
                navigation.navigate('Scanner')
            }
        }
        else if (item.heading == 'Profile Information') {
            navigation.navigate('MyProfile')
        }
        else if (item.heading == 'Refer to Friends') {
            onShare()
        }else if(item.heading=='Networks'){
            navigation.navigate('SelectNetwork')
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.view} onPress={() => on_click(item)}>
            <Image source={item.icon}
                style={styles.icon}
            />
            <View style={{ flex: 1, marginLeft: 16, }}>
                <Text style={styles.heading} >{item.heading}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
            <Image source={Images.arrowright} style={{ tintColor: colors.black }} />
        </TouchableOpacity>
    );

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader text={"Settings"} back right />
                <View style={styles.containter}>
                    <View >
                        <FlatList
                            data={Data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ marginTop: 16 }}
                        />
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={styles.Text}>NOTIFICATIONS</Text>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('notification', { notification: profile })}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 17, borderBottomColor: "#CAC8DA34", }}>
                            <Image source={Images.bell}
                                style={styles.img}
                            />
                            <Text style={styles.Text2}>Notification</Text>
                            <Image source={Images.arrowright}
                                style={{ tintColor: colors.black }}

                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            // AsyncStorage.removeItem('access_token')
                            // AsyncStorage.removeItem('refresh_Access_Token')
                            // AsyncStorage.removeItem('verify_user')
                          
                            navigation.navigate('Auth', { screen: 'Login', });
                        }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 17, borderBottomColor: "#CAC8DA34", }}>
                            <Image source={Images.logout}
                                style={styles.img}
                            />
                            <Text style={styles.Text2}>Log Out</Text>
                            <Image source={Images.arrowright}
                                style={{ tintColor: colors.black }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}
export default Settings

const NotificationCom = ({ item }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.view}>
            <Image source={item.image}
                style={styles.icon}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.heading} >{item.Text}</Text>
                <Text style={styles.text}>{item.content}</Text>
            </View>
            <View>
                <Switch
                    trackColor={{ false: "#0000001A", true: colors.blue }}
                    thumbColor={isEnabled ? "#FFFFF" : "#FBFCFC"}
                    ios_backgroundColor="#0000001A"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 14,
        color: colors.extradarkgray,
        marginTop: 5,
        fontFamily: Fonts.SourceSansProRegular

    },
    icon: {
        height: 22,
        width: 22,
        tintColor: colors.blue
    },
    view: {
        borderBottomWidth: 1,
        borderBottomColor: "#CAC8DA34",
        justifyContent: "space-between",
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    heading: {
        color: colors.extralightblack,
        fontSize: 16,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    Text: {
        color: colors.extralightblack,
        fontSize: 16,
        fontFamily: Fonts.SourceSansProRegular
    },
    Text2: {
        flex: 1,
        color: colors.extralightblack,
        fontSize: 16,
        marginLeft: 17,
        fontFamily: Fonts.SourceSansProSemiBold

    },
    img: {
        height: 20,
        width: 20,
        tintColor: colors.blue,
    }
})