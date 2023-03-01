import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Button, Button2, CustomHeader, Header, InputText } from '../../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import Toast from 'react-native-toast-message';

const CustomToken = ({ navigation }) => {
    console.log("Custom Token")
    const [showNetwork, setShowNetwork] = useState('')
    const [tokenDetail, setTokenDetail] = useState({
        contractAddress: '',
        tokenName: '',
        symbol: '',
        decimal: ''
    })
    const _getNetwork = async () => {
        console.log("Getting Network")
        const checkRpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));
        console.log("Network", checkRpcData)
        setShowNetwork(checkRpcData.symbol)
    }
    const _addToken = async () => {
        if (!tokenDetail.contractAddress) {
            Toast.show({
              type: 'error',
              text1: 'Please enter contract address',
            })
            return
          }
          if (!tokenDetail.tokenName) {
            Toast.show({
              type: 'error',
              text1: 'Please enter token name',
            })
            return
          }
          if (!tokenDetail.symbol) {
            Toast.show({
              type: 'error',
              text1: 'Please enter token symbol',
            })
            return
          }
          if (!tokenDetail.decimal) {
            Toast.show({
              type: 'error',
              text1: 'Please enter decimals',
            })
            return
          }

        let data = [];

        let tempWallet = [];
        let x = JSON.parse(await AsyncStorage.getItem('Gen_token_user_data'))
        tempWallet = x;
        tempWallet?.map(item => {
            data.push(item);
        });
        const rpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));
        const sAddress = await AsyncStorage.getItem('selectedAddress')
        data.push({ network: rpcData.symbol, tokenAddress: tokenDetail.contractAddress, tokenSymbol: tokenDetail.symbol, tokenDecimal: tokenDetail.decimal, walletAddress: sAddress });
        await AsyncStorage.setItem('Gen_token_user_data', JSON.stringify(data))
        navigation.navigate('Wallet');
    }

    useEffect(() => {
        console.log("UseEffect")
        _getNetwork()
    }, [])

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Add Custom Token"} back />
                <View style={{ flex: 1 }}>
                    <View style={styles.vieww}>
                        <Text style={styles.text4}>Network</Text>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={styles.text5}>{showNetwork}</Text>
                            {/* <Image source={Images.arrowright}
                                style={{ marginLeft: 17 }}
                            /> */}
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.containter}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}

                                >Contract Address</Text>
                                <InputText
                                    placeholder={"Enter Contract Address"}
                                    placeholderTextColor={colors.textlightgray}
                                    inputstying={styles.input1}
                                    onChangeText={(t) => setTokenDetail({ ...tokenDetail, contractAddress: t })}
                                >Contract Address</InputText>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* <TouchableOpacity>
                                        <Text style={styles.text3}>Paste</Text>
                                    </TouchableOpacity> */}
                                    {/* <TouchableOpacity>
                                        <Image source={Images.scanner}
                                            style={styles.Image}
                                        />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}

                                >Name</Text>
                                <InputText placeholder={"Enter token name"}
                                    onChangeText={(t) => setTokenDetail({ ...tokenDetail, tokenName: t })}
                                    inputstying={styles.input1} placeholderTextColor={colors.textlightgray} />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}>Symbol</Text>
                                <InputText inputstying={styles.input1}
                                    onChangeText={(t) => setTokenDetail({ ...tokenDetail, symbol: t })}
                                    placeholder={"Enter token name"} placeholderTextColor={colors.textlightgray} />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.text}>Decimal</Text>
                                <InputText inputstying={styles.input1} placeholder={"Enter token name"}
                                    onChangeText={(t) => setTokenDetail({ ...tokenDetail, decimal: t })}
                                    placeholderTextColor={colors.textlightgray} />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
                            <Button onPress={ _addToken}
                                styling={{ height: 52 }}
                                text={'Add Token'}
                                textstyle={{ fontSize: 16, fontWeight: "600" }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}
export default CustomToken

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16
    },
    text2: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
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
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
        marginRight: 17

    },
    text4: {
        color: colors.white,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
    },
    text5: {
        color: colors.white,
        fontSize: 16,
        fontFamily: Fonts.SourceSansProSemiBold,

    },
    Image: {
        height: 24,
        width: 24,
        tintColor: colors.blue
    },

})