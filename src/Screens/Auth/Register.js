import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, StatusBar, } from 'react-native';
import { Images } from '../../Res/Images';
import { colors } from '../../Res/Colors';
import { InputText } from '../../components/common';
import { Button } from '../../components/common';
import { Fonts } from '../../Res';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader';
import Toast from 'react-native-toast-message';
import { registerUser } from '../../redux/actions/users.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation }) => {
    const isLoading = useSelector(state => state.users.isRequesting)
    const dispatch = useDispatch()
    const [user, setuser] = useState({
        name: '', email: '', password: '', confirmPassword: '', referralCode: ''
    })
    const [olduser, setolduser] = useState()
    const getData = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            const data = JSON.parse(user)
            setolduser(data)
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const signupUser = () => {
        if (!user.name) {
            Toast.show({
                type: 'error',
                text1: 'Please enter name.',
            })
            return
        }
        if (!user.email) {
            Toast.show({
                type: 'error',
                text1: 'Please enter email.',
            })
            return
        }
        // if (isEmailValid(user.email)) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'email not correct.',
        //     })
        //     return
        // }
        if (!user.password) {
            Toast.show({
                type: 'error',
                text1: 'Please enter password.',
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
        dispatch(registerUser(user)).then(res => {
            if (res) {
                if (res?.user[0]?.id !== olduser?.id) {
                    AsyncStorage.removeItem('Pin')
                    AsyncStorage.removeItem('refresh_Access_Token')
                    AsyncStorage.removeItem('access_token')
                    AsyncStorage.removeItem('verify_user')
                    AsyncStorage.removeItem('2FA_check')
                    AsyncStorage.removeItem('walletInfoList')
                }
                AsyncStorage.setItem('access_token', res?.accessToken)
                Toast.show({
                    type: 'success',
                    text1: res?.message,
                })
                navigation.navigate('VerifyEmail')
            }
        })
    }

    return (
        <>
            <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
            <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
                <Loader isLoading={isLoading} />
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <Image source={Images.art1}
                        style={styles.img} />
                    <View style={styles.containter}>
                        <View style={{ marginTop: 22, }}>
                            <Text style={styles.text}>Create a New Account</Text>
                            <Text style={styles.txt}> Create an account so you can manage your {"\n"} crypto balance</Text>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <InputText placeholder={"Full Name"}
                                placeholderTextColor={colors.darktextgray}
                                onChangeText={(t) => setuser({ ...user, name: t })} />
                            <InputText placeholder={"Email Address"}
                                placeholderTextColor={colors.darktextgray}
                                inputstying={{ marginTop: 14 }}
                                onChangeText={(t) => setuser({ ...user, email: t })} />
                            <InputText placeholder={"Password"}
                                placeholderTextColor={colors.darktextgray}
                                inputstying={{ marginTop: 14 }}
                                secureTextEntry
                                onChangeText={(t) => setuser({ ...user, password: t })} />
                            <InputText placeholder={"Confirm Password"}
                                placeholderTextColor={colors.darktextgray}
                                inputstying={{ marginTop: 14 }}
                                secureTextEntry
                                onChangeText={(t) => setuser({ ...user, confirmPassword: t })} />
                            <InputText placeholder={"Referral Code"}
                                placeholderTextColor={colors.darktextgray}
                                inputstying={{ marginTop: 14 }}
                                onChangeText={(t) => setuser({ ...user, referralCode: t })} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.title}> I agree to our <Text style={styles.titletxt}>Terms of Services <Text style={styles.title}>and </Text><Text style={styles.titletxt}>Privacy{"\n"} Policy.</Text>
                            </Text>
                            </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button onPress={signupUser}
                                styling={styles.logbtn}
                                text={"Continue"}>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.last}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.newTxt}>Joined us before? <Text style={styles.regTxt}>Login </Text> </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    )
}

export default Register

export class Helper {
    static isEmailValid(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email) == 0;
    }
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: colors.blue,
        marginTop: 10,
        fontSize: 29,
        fontFamily: Fonts.SourceSansProBold
    },
    img: {
        marginTop: 18,
        alignSelf: "center"
    },
    txt: {
        color: colors.textlightgray,
        fontSize: 14,
        marginTop: 10,
        lineHeight: 20,
        fontFamily: Fonts.SourceSansProRegular

    },
    newTxt: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Fonts.SourceSansProRegular
    },
    regTxt: {
        color: colors.blue,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Fonts.SourceSansProBold
    },
    title: {
        color: colors.lightblack,
        fontSize: 13,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    titletxt: {
        color: colors.blue,
        fontSize: 13,
        lineHeight: 18,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    last: {
        borderTopColor: colors.bordergray,
        borderTopWidth: 1, paddingVertical: 14, marginTop: 40
    }
})