import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, } from 'react-native';
import { CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';




const ImportWallet = ({ navigation }) => {

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} >
                <CustomHeader text={"Import Wallet"} back />
                <View style={styles.containter}>
                    <Text style={styles.text}>Import existing wallet by</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PrivateKey', { type: "PrivateKey" })}
                        style={styles.view}>
                        <Text style={styles.privatetext}>Private Key</Text>
                    </TouchableOpacity>
                    <Text style={styles.text2}>or</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PrivateKey', { type: "MnemonicPhrase" })}
                        style={[styles.view, { marginTop: 32 }]}>
                        <Text style={styles.privatetext}>Mnemonic Phrase</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )


}
export default ImportWallet

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    text: {
        color: colors.gray,
        fontSize: 15,
        marginTop: 50,
        color: colors.medtextgray,
        fontFamily: Fonts.SourceSansProRegular
    },
    view: {
        height: 64,
        width: "100%",
        borderWidth: 3,
        borderRadius: 6,
        marginTop: 22,
        backgroundColor: colors.lightperple,
        borderColor: colors.perple,
        alignItems: "center",
        justifyContent: "center"

    },
    privatetext: {
        fontSize: 21,
        color: colors.borderblue,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    text2: {
        color: colors.medtextgray,
        fontSize: 15,
        marginTop: 23,
        fontFamily: Fonts.SourceSansProRegular
    },
})