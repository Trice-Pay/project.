
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, StatusBar, TouchableOpacity, Image, Switch } from 'react-native';
import { CustomHeader } from "../../components/common/Header";
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import { Images } from "../../Res/Images";
import { useDispatch, useSelector } from "react-redux";
import { crypto_Currencies } from "../../redux/actions/needs.actions";
import Loader from "../../components/common/Loader";
import { SvgUri } from 'react-native-svg';
import axios from 'axios';


const Crypto_currencies = ({ navigation, route }) => {
    const isLoading = useSelector(state => state.needs.isRequesting)
    const [currency, setcurrency] = useState()
    const dispatch = useDispatch()
    const { SelectedWallet, walletaddress } = route?.params || {}

    // const get_Currencies = () => {
    //     dispatch(crypto_Currencies()).then(res => { 
    //        // setcurrency(res.payload.data.result)
    //        //currency.push(res.payload.data.result)
    //         console.log("crpto-curencydata--->",res.payload.data.result)
    //     })
    // }

    // useEffect(() => {
    //     get_Currencies()
    // }, [])

    useEffect(() => {
        // setInterval(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                // setCoins(res.data);
                setcurrency(res.data)
                console.log("coinsData-->", res.data);
            }).catch(error => console.log(error))
        // }, 5000)
    }, [])




    const renderItem = (item) => {
        console.log("itemm-->",item)
        return (
            <TouchableOpacity style={styles.list}
                onPress={() => navigation.navigate('Transaction', { curr: item, SelectedWallet, walletaddress })}  >
                <View style={{ flexDirection: 'row', alignItems: "center",width:"40%"}}>
                    {/* <SvgUri
                        uri={item.image}
                    /> */}
                    <Image source={{ uri: item.image }} style={{ width: 24, height: 24 }} />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.cointext}>
                            {item.name}
                        </Text>
                        <Text style={styles.quantitytext}> {item.symbol}
                        </Text>
                    </View>

                </View>

                <View style={{ marginLeft: "25%",width:"30%" }}>
                    <Text style={{ fontSize: 18, fontFamily: Fonts.SourceSansProSemiBold, color: colors.black }}>${item.current_price} </Text>
                    <View style={{ flexDirection: "row" }}>

                        <Text style={{ fontSize: 13, color: colors.textlightgray, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}> ${item.price_change_24h.toFixed(2)} </Text>
                        {item.price_change_percentage_24h < 0 ?
                            <Text style={{ fontSize: 13, color: colors.red, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}> {item.price_change_percentage_24h.toFixed(2)}% </Text> :
                            <Text style={{ fontSize: 13, color: colors.green, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}> {item.price_change_percentage_24h.toFixed(2)}% </Text>
                        }
                    </View>
                </View>

                <View>
                    <Image source={Images.arrowright} style={{ tintColor: colors.black }} />
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
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <CustomHeader
                        back
                        text={"Crypto currencies"} />
                    <FlatList
                        data={currency}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        </>
    );
}
export default Crypto_currencies

const styles = StyleSheet.create({
    containter: {
        flex: 1,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "600",
    },
    text2: {
        color: colors.gray,
        fontSize: 13,
        marginLeft: 65,
    },

    Image: {
        height: 25,
        width: 25,
        marginTop: 28,
        marginLeft: 20
    },
    cointext: {
        color: colors.black,
        fontSize: 18,
        fontWeight: '700',

    },
    quantitytext: {
        color: colors.textlightgray,
        fontSize: 13,
        marginTop: 4
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
    list: {
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderBottomColor: colors.bordergray,
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    cointext: {
        color: colors.black,
        fontSize: 18,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    quantitytext: {
        color: colors.textlightgray,
        fontSize: 13,
        marginTop: 4,
        fontFamily: Fonts.SourceSansProRegular
    },


})