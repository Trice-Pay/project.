import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Button, CustomHeader } from '../../components/common';
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { getBal, loadWalletFromMnemonics, saveWallet } from "../../Utils";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";


const VerifyMnemonic = ({ navigation, route }) => {
    const { array, walletname, walletPass, walletConfirmPass } = route?.params || {}


    const [shuffle, setShuffle] = useState(
        [...array].sort(() => 0.5 - Math.random())
    );
    const [result, setResult] = useState([]);
    const [isLoading, SetisLoading] = useState(false)
    const dispatch = useDispatch()
    // const isLoading = useSelector(state => state.needs.isRequesting)

    console.log(array, "originalarray")

    const test = () => {
        SetisLoading(true)
        setTimeout(() => {
            checkIfResultIsValid()
        }, 500)
    }


    const checkIfResultIsValid = async () => {
        if (result.length) {
            const res = result.every((valueFromShuffle, index) => {
                return (valueFromShuffle === array[index])
            })
            if (!!res) {
                try {
                    const wallet = await loadWalletFromMnemonics(array, walletname, walletPass, walletConfirmPass)
                    if (wallet) {
                        Toast.show({
                            type: "success",
                            text1: 'mnemonics matched success.',
                        })
                        navigation.navigate('BottomTabs');
                        SetisLoading(false)
                    }
                }
                catch (err) { console.log(err) }
            }
            else {
                Toast.show({
                    type: "error",
                    text1: 'mnemonics not matched to original order.',
                })
            }
        }
        else {
            Toast.show({
                type: "error",
                text1: 'mnemonics not found.',
            })

        }
    }

    const handleSelect = (e) => {
        const f = [...shuffle];
        const targetIndex = f.indexOf(e);
        f.splice(targetIndex, 1);
        setShuffle(f);
        setResult([...result, e]);
    };

    const handleUnSelect = (e) => {
        const f = [...result];
        const targetIndex = f.indexOf(e);
        f.splice(targetIndex, 1);
        setResult(f);
        setShuffle([...shuffle, e]);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flexDirection: "row", margin: 5 }}
                onPress={() => handleSelect(item)} >
                <View style={{ borderWidth: 1, borderColor: colors.bordergray, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 13 }}>
                    <Text style={styles.text3}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <Loader isLoading={isLoading} />
                <CustomHeader text={"Verify Mnemonic"} back />
                <View style={styles.containter}>
                    <TouchableOpacity style={{
                        marginTop: 21,
                        alignItems: "center",
                        paddingHorizontal: 20,
                    }}>
                        <Text style={styles.text}>Verify you recovery phrase</Text>
                        <Text style={styles.text2}>Please click the mnemonics by original {"\n"} order</Text>
                    </TouchableOpacity>
                    <View style={styles.box}>
                        <FlatList
                            data={result}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: colors.bordergray,
                                        borderRadius: 6, paddingVertical: 7,
                                        paddingHorizontal: 13,
                                        alignSelf: "center",
                                        margin: 4
                                    }}
                                        onPress={() => handleUnSelect(item)} >
                                        <Text style={styles.text3}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(index) => String(index)}
                            numColumns={4}
                            contentContainerStyle={{ alignSelf: "center", marginTop: 10 }}
                        />
                    </View>
                    <FlatList
                        data={shuffle}
                        renderItem={renderItem}
                        keyExtractor={(index) => String(index)}
                        numColumns={4}
                        contentContainerStyle={{ marginTop: 20, alignItems: "center" }}
                    />
                    <View style={{ justifyContent: "flex-end", width: "100%" }}>
                        <Button
                            onPress={() => test()}
                            styling={styles.resbtn}
                            text={'Verify'}
                            textstyle={{ fontSize: 16, }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}
export default VerifyMnemonic

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 13,
        alignItems: "center"
    },

    text: {
        color: colors.blue,
        fontSize: 19,
        fontFamily: Fonts.SourceSansProBold
    },
    text3: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: Fonts.SourceSansProRegular
    },
    box: {
        height: 160,
        width: "100%",
        borderWidth: 1,
        marginBottom: 20,
        borderColor: colors.bordergray,
        marginTop: 13,
        borderRadius: 3,
    },
    text2: {
        color: colors.medtextgray,
        fontSize: 15,
        marginTop: 7,
        textAlign: "center",
        fontFamily: Fonts.SourceSansProRegular
    },
    resbtn: {
        marginBottom: 34,
        height: 52,
        borderRadius: 6,
        backgroundColor: colors.darkblue
    },

    img: {
        marginTop: 7
    },

})