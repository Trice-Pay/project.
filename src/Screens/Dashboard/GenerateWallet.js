import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Button, CustomHeader, InputText } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateMnemonics } from '../../Utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const GenerateWallet = ({ navigation }) => {
    const [userwallet, setuserwallet] = useState({ name: '', password: '', confirmPassword: '' })

    const _next = () => {
        if (!userwallet.name) {
            Toast.show({
                type: 'error',
                text1: 'Please enter name.',
            })
            return
        }
        if (!userwallet.password) {
            Toast.show({
                type: 'error',
                text1: 'Please enter password.',
            })
            return
        }
        if (!userwallet.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Please enter confirm password.',
            })
            return
        }
        if (userwallet.confirmPassword != userwallet.password) {
            Toast.show({
                type: 'error',
                text1: 'password mismatch.',
            })
            return
        }
        generateMnemonics()
        AsyncStorage.setItem('Gen_wallet_user_data', JSON.stringify(userwallet))
        navigation.navigate('RecoveryPharse', {
            walletname: userwallet.name,
            walletPass: userwallet.password,
            walletConfirmPass: userwallet.confirmPassword
        })
    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Generate Wallet"} back />
                <KeyboardAwareScrollView style={{ flex: 1 }} >
                    <View style={styles.containter}>
                        <View>
                            <View style={styles.view}>
                                <Text style={styles.text}>Name</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Wallet 1"} placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, name: t })} />
                            </View>
                            <View style={[styles.view, { marginTop: 15 }]}>
                                <Text style={styles.text}>Password</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Password"} secureTextEntry placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, password: t })} />
                            </View>
                            <View style={[styles.view, { marginTop: 15 }]}>
                                <Text style={styles.text}>Confirm Password</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Confirm Password"}
                                    secureTextEntry placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, confirmPassword: t })}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.last}>
                    <Button
                        text={'Next'}
                        styling={styles.btn}
                        textstyle={styles.btntext}
                        onPress={_next}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}
export default GenerateWallet

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,

    },
    input: {
        fontSize: 18,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: colors.black,
        marginTop: 6,
        color: colors.black
    },
    view: {
        marginTop: 27
    },
    btn: {
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.borderblue,

    },
    btntext: {
        color: colors.borderblue,
        fontSize: 16,
        fontFamily: Fonts.SourceSansProBold
    },
    last: {
        paddingBottom: 34,
        paddingHorizontal: 20,
    }

})