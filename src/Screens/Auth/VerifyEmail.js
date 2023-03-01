import React, { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, Keyboard } from 'react-native';
import { ScrollView } from 'react-native';
import { Button } from '../../components/common';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Fonts } from '../../Res';
import { useDispatch, useSelector } from 'react-redux'
import { verifyemail, resendcode } from '../../redux/actions/users.actions';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import Loader from '../../components/common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage'

const VerifyEmail = ({ navigation, route }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const CELL_COUNT = 6;
    const isLoading = useSelector(state => state.users.isRequesting)
    const dispatch = useDispatch()
    const [initialTime, setInitialTime] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [token, settoken] = useState()
    const t = AsyncStorage.getItem('access_token')
    t.then((e) => { settoken(e) })
    //console.log(token,"token")

    const param = { otp: value, id: token }

    const reSend = () => {
        setInitialTime(15);
        setStartTimer(true);
        dispatch(resendcode()).then(res => {
            if (res) {
                Toast.show({
                    type: 'success',
                    text1: res?.payload?.data?.message,
                })
            }
        })
    };

    useEffect(() => {
        if (initialTime > 0) {
            setTimeout(() => {
                setInitialTime(initialTime - 1);
            }, 1000);
        }

        if (initialTime === 0 && startTimer) {
            setStartTimer(false);
        }
    }, [initialTime, startTimer]);

    const _Verify = () => {
        if (!value) {
            Toast.show({
                type: 'error',
                text1: 'Please enter email code.',
            })
            return
        }
        dispatch(verifyemail(param)).then(res => {
            if (res) {
                AsyncStorage.setItem('access_token', res?.accessToken)
                AsyncStorage.setItem('refresh_Access_Token', res?.refreshAccessToken)
                Toast.show({
                    type: 'success',
                    text1: res?.message,
                })
                //navigation.navigate('PinView', { type: "verify" })
                navigation.navigate('Login')
            }
        })
    }


    return (
        <>
            <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Loader isLoading={isLoading} />
                <ScrollView style={{ flex: 1 }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                        <Image source={Images.art2}
                            style={styles.img} />
                    </View>
                    <View style={{ paddingHorizontal: 23 }}>
                        <View>
                            <Text style={styles.text}>Verify Your Email</Text>
                            <Text style={styles.txt}>We have sent you an email with verification {"\n"}code.Please enter the provided code.</Text>
                        </View>
                        <View style={styles.root}>
                            <CodeField
                                ref={ref}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                onSubmitEditing={Keyboard.dismiss}
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <View
                            style={{ marginTop: 32 }}>
                            <Button onPress={_Verify}
                                styling={styles.logbtn}
                                text={"Continue"}>
                            </Button>
                        </View>
                        <View style={styles.last} >
                            <Text style={styles.newtxt}>Resend code after {initialTime}</Text>
                            <TouchableOpacity onPress={reSend}
                                style={[styles.resendtxt, { opacity: startTimer ? 0.5 : 1 }]} disabled={startTimer}  >
                                <Text style={{
                                    color: '#FFFFFF', fontSize: 14,
                                    fontFamily: Fonts.SourceSansProRegular
                                }}>Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )


}
export default VerifyEmail

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 15
    },
    img: {

    },
    text: {
        color: colors.blue,
        marginTop: 46,
        fontSize: 29,
        fontFamily: Fonts.SourceSansProBold
    },
    txt: {
        color: colors.textlightgray,
        fontSize: 14,
        marginTop: 10,
        lineHeight: 24,
        fontFamily: Fonts.SourceSansProRegular
    },
    input: {
        height: 49,
        width: 45,
        color: 'gray',
        borderColor: '#B9B9B9',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 17

    },
    newtxt: {
        color: colors.textlightgray,
        fontSize: 12,
        fontFamily: Fonts.SourceSansProRegular
    },
    resendtxt: {
        backgroundColor: colors.green,
        borderRadius: 17,
        paddingRight: 23,
        paddingLeft: 23,
        paddingTop: 5,
        paddingBottom: 6,
        marginLeft: 16
    },
    inputview: {
        flexDirection: 'row',
        marginTop: 21,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingRight: 18,
        paddingStart: 5
    },
    last: {
        justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 25
    }, root: {
        flex: 1,
        marginTop: 21,
    },
    cell: {
        width: 45,
        height: 49,
        lineHeight: 48,
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B9B9B9',
        textAlign: 'center',
        color: colors.black
    },
    focusCell: {
        borderColor: '#000',
    },
    img: {

    },
})