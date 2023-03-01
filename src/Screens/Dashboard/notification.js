import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, StatusBar, FlatList, Switch } from 'react-native';
import { CustomHeader } from '../../components/common';
import { getPromoNotiStatus, getPushNotiStatus, getSmsNotiStatus } from '../../redux/actions/needs.actions';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';

const Notification = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [isPush, setIsPush] = useState(false);
    const [isSms, setIsSms] = useState(false);
    const [isPromo, setIsPromo] = useState(false);
    const { notification } = route?.params || {}

    const status = () => {
        notification.isPushNotificationsEnabled == 1 ?
            setIsPush(true) : setIsPush(false)
        notification.isSmsNotificationsEnabled == 1 ?
            setIsSms(true) : setIsSms(false)
        notification.isPromotionalNotificationsEnabled == 1 ?
            setIsPromo(true) : setIsPromo(false)
    }

    useEffect(() => {
        status()
    }, [])


    const _Push = () => {
        setIsPush(!isPush)
        dispatch(getPushNotiStatus({ isPushNotificationsEnabled: !isPush ? 1 : 0 })).then(res => {
            Toast.show({
                text1: res.payload.data.message,
            })
        })
    }
    const _Sms = () => {
        setIsSms(!isSms)
        dispatch(getSmsNotiStatus({ isSmsNotificationsEnabled: !isSms ? 1 : 0 })).then(res => {
            Toast.show({
                text1: res.payload.data.message,
            })
        })
    }
    const _Promo = async () => {
        setIsPromo(!isPromo)
        dispatch(getPromoNotiStatus({ isPromotionalNotificationsEnabled: !isPromo ? 1 : 0 })).then(res => {
            Toast.show({
                text1: res.payload.data.message,
            })
        })

    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader text={"Notifications"} back />
                <View style={styles.containter}>
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.view}>
                            <Image
                                source={Images.bell}
                                style={styles.icon} />
                            <View
                                style={{ flex: 1, marginLeft: 16 }}>
                                <Text style={styles.heading} >Push Notifications</Text>
                                <Text style={styles.text}>For daily update you will get it</Text>
                            </View>
                            <View>
                                <Switch
                                    trackColor={{ false: "#0000001A", true: colors.blue }}
                                    thumbColor={isPush ? "#FFFFF" : "#FBFCFC"}
                                    ios_backgroundColor="#0000001A"
                                    onValueChange={_Push}
                                    value={isPush}
                                />
                            </View>
                        </View>
                        <View
                            style={styles.view}>
                            <Image source={Images.bell}
                                style={styles.icon}
                            />
                            <View
                                style={{ flex: 1, marginLeft: 16 }}>
                                <Text style={styles.heading} >SMS Notifications</Text>
                                <Text style={styles.text}>For daily update you will get it</Text>
                            </View>
                            <View>
                                <Switch
                                    trackColor={{ false: "#0000001A", true: colors.blue }}
                                    thumbColor={isSms ? "#FFFFF" : "#FBFCFC"}
                                    ios_backgroundColor="#0000001A"
                                    onValueChange={_Sms}
                                    value={isSms}
                                />
                            </View>
                        </View>
                        <View
                            style={styles.view}>
                            <Image
                                source={Images.bell}
                                style={styles.icon}
                            />
                            <View style={{ flex: 1, marginLeft: 16 }}>
                                <Text style={styles.heading} >Promotional Notifications</Text>
                                <Text style={styles.text}>For daily update you will get it</Text>
                            </View>
                            <View>
                                <Switch
                                    trackColor={{ false: "#0000001A", true: colors.blue }}
                                    thumbColor={isPromo ? "#FFFFF" : "#FBFCFC"}
                                    ios_backgroundColor="#0000001A"
                                    onValueChange={_Promo}
                                    value={isPromo}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Notification

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
        height: 20,
        width: 20,
        tintColor: colors.extradarkgray
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
        fontWeight: "300"

    }
})