import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Button, CustomHeader, InputText } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';



const EditWallet = ({ navigation, route }) => {
    const [userwallet, setuserwallet] = useState({ address: '', walletConfirmPass: '', walletName: '', walletPass: '', privateKey: '' })
    const { SelectedWallet, walletaddress } = route?.params || {}
    const [Selected, setSelected] = useState()
    const [Default, setDefault] = useState()

    const selectedWallet = () => {
        const Array = walletaddress.find((i) => i.address === SelectedWallet)
        setSelected(Array)
    }

    useEffect(() => {
        selectedWallet()
    }, [])

    useEffect(() => {
        if (Selected?.walletName) {
            setDefault(Selected?.walletName)
        }
        else {
            setDefault(walletaddress[0]?.walletName)
        }

    }, [Selected?.walletName])


    useEffect(() => {
        setuserwallet({
            ...userwallet,
            walletName: Selected?.walletName || walletaddress[0]?.walletName,
            walletPass: Selected?.walletPass || walletaddress[0]?.walletPass,
            walletConfirmPass: Selected?.walletConfirmPass || walletaddress[0]?.walletConfirmPass,
            address: Selected?.address || walletaddress[0]?.address,
            privateKey: Selected?.privateKey || walletaddress[0]?.privateKey
        })
    }, [Selected || walletaddress])

    const _edit = async () => {
        try {
            const Address = await AsyncStorage.getItem('walletInfoList')
            let postsFav = JSON.parse(Address);

            const postsItems = postsFav.filter(function (e) {
                return e.walletName === Default
            });
            const index = postsFav.map((x) => { return x.address }).indexOf(postsItems[0]?.address);
            postsFav[index].walletName = userwallet.walletName;
            postsFav[index].walletPass = userwallet.walletPass
            postsFav[index].walletConfirmPass = userwallet.walletConfirmPass
            postsFav[index].privateKey = userwallet.privateKey
            await AsyncStorage.setItem('walletInfoList', JSON.stringify(postsFav));
            navigation.goBack()
        } catch (error) {
          //  console.log('error: ', error);
        }
    };

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Edit Wallet"} back />
                <KeyboardAwareScrollView style={{ flex: 1 }} >
                    <View style={styles.containter}>
                        <View>
                            <View style={styles.view}>
                                <Text style={styles.text}>Name</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Wallet 1"} placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, walletName: t })}
                                    defaultValue={Selected?.walletName || walletaddress[0]?.walletName}
                                />
                            </View>
                            <View style={[styles.view, { marginTop: 15 }]}>
                                <Text style={styles.text}>Password</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Password"} placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, walletPass: t })}
                                    defaultValue={Selected?.walletPass || walletaddress[0]?.walletPass}
                                />
                            </View>
                            <View style={[styles.view, { marginTop: 15 }]}>
                                <Text style={styles.text}>Confirm Password</Text>
                                <InputText inputstying={styles.input}
                                    placeholder={"Confirm Password"}
                                    placeholderTextColor={colors.black}
                                    onChangeText={(t) => setuserwallet({ ...userwallet, walletConfirmPass: t })}
                                    defaultValue={Selected?.walletConfirmPass || walletaddress[0]?.walletConfirmPass}
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
                        onPress={_edit}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}
export default EditWallet

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