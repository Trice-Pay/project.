import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Button, Button2, CustomHeader, Header, InputText } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader';
import Toast from 'react-native-toast-message';
import { changePassword, updatePassword, } from '../../redux/actions/users.actions';
import { genOtp_forProfile } from '../../redux/actions/needs.actions';



const ChangePassword = ({ navigation, route }) => {
    const isLoading = useSelector(state => state.users.isRequesting)
    const dispatch = useDispatch()
    const [user, setuser] = useState({ otp: "", password: '', confirmPassword: "" })
    const { type } = route?.params || {}
    const [showotp, setshowotp] = useState(false)
    console.log(type, "type")

    const _submit = () => {
        if (type == 'changepassword') {
            _updatePassword()
        }
        else {
            _changePassword()
        }
    }

    const _changePassword = () => {
        if (!user.otp) {
            Toast.show({
                type: 'error',
                text1: 'Please enter OTP.',
            })
            return
        }
        if (!user.password) {
            Toast.show({
                type: 'error',
                text1: 'Please enter password.',
            })
            return
        }
        if (!user.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Please enter confirm password.',
            })
            return
        }
        if (user.password != user.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'password mismatch.',
            })
            return
        }
        if (user.password.length < 6) {
            Toast.show({
                type: 'error',
                text1: 'please enter a password of at least 6 characters.'
            })
            return
        }
        dispatch(changePassword(user)).then(res => {
            if (res) {
                Toast.show({
                    type: 'success',
                    text1: res?.message,
                })
                navigation.navigate('Login')
            }
        })
    }

    const _updatePassword = () => {
        if (!user.password) {
            Toast.show({
                type: 'error',
                text1: 'Please enter password.',
            })
            return
        }
        if (!user.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Please enter confirm password.',
            })
            return
        }
        if (user.password.length < 6) {
            Toast.show({
                type: 'error',
                text1: 'please enter a password of at least 6 characters.'
            })
            return
        }
        if (user.password != user.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'password mismatch.',
            })
            return
        }
        if (!showotp || !user.otp) {
            dispatch(genOtp_forProfile()).then(res => {
                setshowotp(true)
                Toast.show({
                    text1: res?.payload?.data?.message,
                })
            })
            return
        }
        else {
            dispatch(updatePassword(user)).then(res => {
                console.log(res, "update password")
                if (res) {
                    Toast.show({
                        type: 'success',
                        text1: res?.message,
                        
                    })
                    navigation.goBack()
                }
            })

        }
    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <Loader isLoading={isLoading} />
                <CustomHeader text={"Change Password"} back />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.containter}>
                            {type == 'changepassword' ? null :
                                <View style={{ marginTop: 40 }}>
                                    <Text style={styles.text}>Enter Email OTP</Text>
                                    <InputText placeholder={"Enter OTP"} placeholderTextColor={colors.gray}
                                        keyboardType={"number-pad"}
                                        onChangeText={(t) => setuser({ ...user, otp: t })}
                                    />
                                </View>
                            }
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}>New Password</Text>
                                <InputText placeholder={"Enter new password"}
                                    placeholderTextColor={colors.gray}
                                    onChangeText={(t) => setuser({ ...user, password: t })}
                                    secureTextEntry
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}>Confirm Password</Text>
                                <InputText placeholder={"Confirm password"}
                                    placeholderTextColor={colors.gray}
                                    onChangeText={(t) => setuser({ ...user, confirmPassword: t })}
                                    secureTextEntry
                                />
                            </View>
                            {showotp ?
                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.text}>Enter Email OTP</Text>
                                    <InputText placeholder={"Enter OTP"} placeholderTextColor={colors.gray}
                                        keyboardType={"number-pad"}
                                        onChangeText={(t) => setuser({ ...user, otp: t })}
                                    />
                                </View> : null
                            }
                        </View>
                        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
                            <Button onPress={_submit}
                                styling={{ height: 52 }}
                                text={'Submit'}
                                textstyle={{ fontSize: 16, fontWeight: "600" }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}
export default ChangePassword

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
        marginBottom: 10
    },
    text2: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,

    },
    vieww: {
        height: 61,
        width: "100%",
        backgroundColor: colors.borderblue,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 19,
        alignItems: "center"

    },
    box: {
        height: 54,
        width: "100%",
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 29,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16

    },
    input1: {
        borderColor: colors.black,
        backgroundColor: colors.white,
        borderRadius: 6,
        borderWidth: 1,
        marginTop: 6,
        flex: 1,
    },
    text3: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 16,
        marginRight: 17

    },
    text4: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    text5: {
        color: colors.white,
        fontSize: 16,
    },
    Image: {
        height: 24,
        width: 24,
        tintColor: colors.blue
    },

})