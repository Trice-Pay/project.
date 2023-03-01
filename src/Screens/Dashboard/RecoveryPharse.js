import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Button, CustomHeader, Header } from '../../components/common';
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';


const RecoveryPharse = ({ navigation, route }) => {
    const [Array, setArray] = useState()
    const { walletname, walletPass, walletConfirmPass } = route?.params || {}

    useEffect(() => {
        const data = AsyncStorage.getItem('Mnemonic')
        data.then(e => setArray(JSON.parse(e)))
    }, [])

    const copyToClipboard = () => {
        let newarr = Array?.map(e => e)
        Clipboard.setString(newarr.toString())
        Toast.show({
            text1: 'Copied..',
        })
    };

    const renderItem = (item) => (
        <TouchableOpacity style={{ flexDirection: "row", margin: 5 }} >
            <View style={{ borderWidth: 1, borderColor: colors.bordergray, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 15 }}>
                <Text style={styles.text3}>{item}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }}></SafeAreaView>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Recovery Pharse"} back />
                <View style={styles.containter}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.text}>Your recovery pharse</Text>
                        <Text style={styles.text2}>Write down or copy these words in the {"\n"} right order and save them somewhere {"\n"} safe</Text>
                    </View>
                    <View>
                        <FlatList
                            data={Array}
                            renderItem={({ item }) => renderItem(item)}
                            numColumns={4}
                            contentContainerStyle={{ marginTop: 6, paddingHorizontal: 15 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.box}
                        onPress={copyToClipboard}>
                        <Image source={Images.copy} style={{ tintColor: colors.extragray }} />
                        <Text style={styles.text4}>Copy all words</Text>
                    </TouchableOpacity>
                    <View style={styles.last}>
                        <Button
                            text={'Next'}
                            styling={styles.btn}
                            textstyle={styles.btntext}
                            onPress={() => navigation.navigate('VerifyMnemonic', { array: Array, walletname, walletPass, walletConfirmPass })}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}
export default RecoveryPharse

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: colors.white,
    },

    text: {
        color: colors.borderblue,
        fontSize: 19,
        marginTop: 21,
        fontFamily: Fonts.SourceSansProBold
    },
    text3: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: Fonts.SourceSansProRegular
    },
    box: {
        height: 46,
        width: 199,
        borderWidth: 1,
        borderColor: colors.extrabordergray,
        marginTop: 33,
        alignItems: "center",
        borderRadius: 40,
        paddingHorizontal: 26,
        flexDirection: "row",
        alignSelf: "center"

    },
    text2: {
        color: colors.medtextgray,
        textAlign: 'center',
        fontSize: 15,
        marginTop: 7,
        fontFamily: Fonts.SourceSansProRegular
    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
        marginTop: 20

    },
    text4: {
        color: colors.extragray,
        fontSize: 16,
        marginLeft: 13,
        fontFamily: Fonts.SourceSansProRegular

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
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 34,
        paddingHorizontal: 20,
    }
})