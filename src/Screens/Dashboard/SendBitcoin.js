import React, { useState, useEffect } from 'react';
import {
    Text, SafeAreaView, View, StyleSheet, TouchableOpacity,
    ScrollView, Image, TextInput, StatusBar
} from 'react-native';
import { Button, CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import { crypto_Currencies } from '../../redux/actions/needs.actions';
import { useDispatch, useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import Loader from '../../components/common/Loader';
import Toast from 'react-native-toast-message';
import { gasFee } from '../../Utils';


const SendBitcoin = ({ navigation, route }) => {

    const [viewFocused, setViewFocused] = useState(false);
    const [ScanAddress, setScanAddress] = useState()
    const [userData, setuserData] = useState({ amount: '' })
    const { SelectedWallet, walletaddress, bal ,tokenAddress,type,tokenBalance} = route?.params || {}
    const [Selected, setSelected] = useState()
    const [gasPrice, setgasPrice] = useState()
    const [percentageData, setPercentageData] = useState()
    // const [Visible, setModalVisible] = useState(false)
    // const isLoading = useSelector(state => state.needs.isRequesting)
    // const dispatch = useDispatch()
    const selectedWallet = () => {
        const Array = walletaddress?.find((i) => i.address === SelectedWallet)
        setSelected(Array)
        console.log("array---->",SelectedWallet)
    }

    useEffect(() => {
        console.log("tokenadrssss-->",tokenAddress,type,tokenBalance);
        selectedWallet()
    }, [])

    useEffect(() => {
        const per = userData.amount*(5/100);
        setPercentageData(per);
        console.log("PercentageData--",percentageData)
    }, [userData])

    const openScanner = () => {
        setViewFocused(!viewFocused)
    }
    const onSuccess = e => {
        setViewFocused(false)
        setScanAddress(e.data.slice(9))
    };

    const _continue = () => {
        if(type=="tokenAdrs"){
            if (!ScanAddress) {
                Toast.show({
                    type: 'error',
                    text1: 'Please add recipient address.',
                })
                return
            }
            if (!userData.amount) {
                Toast.show({
                    type: 'error',
                    text1: 'Please enter amount.',
                })
                return
            }
            if (userData.amount > tokenBalance) {
                Toast.show({
                    type: 'error',
                    text1: 'insufficient balance.',
                })
                return
            }
            
            navigation.navigate('ConfirmSend', { ScanAddress, amount: userData?.amount,tokenAddress,type:"tokenAdrs" })
        }
        else{
            if (!ScanAddress) {
                Toast.show({
                    type: 'error',
                    text1: 'Please add recipient address.',
                })
                return
            }
            if (!userData.amount) {
                Toast.show({
                    type: 'error',
                    text1: 'Please enter amount.',
                })
                return
            }
            if (userData.amount > bal) {
                Toast.show({
                    type: 'error',
                    text1: 'insufficient balance.',
                })
                return
            }
            const walletKey = Selected?.privateKey || walletaddress[0]?.privateKey
            navigation.navigate('ConfirmSend', { ScanAddress, amount: userData?.amount, walletKey,gasPrice,percentageData })
        }
       
    }

    // const get_Currencies = () => {
    //     dispatch(crypto_Currencies()).then(res => {
    //         setcurrency(res.payload.data.result)
    //     })
    // }
    // useEffect(() => {
    //     get_Currencies()
    // }, [])

    // const renderItem = (item) => {
    //     return (
    //         <TouchableOpacity style={styles.list}
    //         >
    //             <View style={{ flexDirection: 'row', alignItems: "center" }}>
    //                 <SvgUri
    //                     uri={item.logo_url}
    //                 />
    //                 <View style={{ marginLeft: 15 }}>
    //                     <Text style={styles.cointext}>
    //                         {item.name}
    //                     </Text>
    //                     <Text style={styles.quantitytext}> {item.default_exchange_value}
    //                     </Text>
    //                 </View>
    //             </View>
    //             <View>
    //                 <Image source={Images.arrowright} style={{ tintColor: colors.black }} />
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    const getFee = () => {
        gasFee().then(res => {
            setgasPrice(res)
            console.log("gasPrice-->",gasPrice)
        })
    }
    useEffect(() => {
        getFee()
    })

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader back text={"Send Bitcoin"} />
                <>
                    {viewFocused ?
                        <View style={{ alignItems: 'center', flex: 1, }}>
                            {/* <QRCodeScanner
                                onRead={onSuccess}
                                showMarker={true}
                            /> */}
                        </View> :
                        <ScrollView style={{ flex: 1 }}>
                            {/* <Loader isLoading={isLoading} /> */}
                            <View style={styles.containter}>
                                {/* <View style={{ marginTop: 21 }}>
                                    <Text style={styles.text}>Currency</Text>
                                    <TouchableOpacity style={styles.view}> */}
                                        {/* // onPress={() => setModalVisible(true)}> */}
                                        {/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}
                                            {/* <Image source={Images.eth}
                                                style={styles.img} /> */}
                                            {/* <Text style={styles.text7}>Polygon</Text>
                                        </View>
                                        <Image source={Images.downarrow}
                                            style={styles.img2} />
                                    </TouchableOpacity>
                                </View> */}
                                <View style={{ marginTop: 23 }}>
                                    <Text style={styles.text}>Recipient</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 6 }}>
                                        <View style={styles.view4}>
                                            <TextInput style={{ flex: 1, fontFamily: Fonts.SourceSansProRegular, fontSize: 13, paddingHorizontal: 12, color: colors.black }}
                                                placeholder={"Paste or scan address"} placeholderTextColor={colors.gray}
                                                value={ScanAddress}
                                                onChangeText={(t) => setScanAddress(t)}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.view5} onPress={openScanner}>
                                            <Image source={Images.scan2}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <Text style={styles.text}>Amount</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: "center" }}>
                                        <View style={styles.view2}>
                                            <TextInput style={styles.text3} placeholder={"0"} placeholderTextColor={colors.blue}
                                                keyboardType={'number-pad'}
                                                onChangeText={(a) => setuserData({ ...userData, amount: a })
                                                } />
                                            <Text style={styles.text6}> </Text>
                                        </View>
                                        <Image source={Images.arrow} />
                                        <View style={styles.view2}>
                                            <TextInput style={styles.text3} placeholder={"0"} placeholderTextColor={colors.blue}
                                                keyboardType={'number-pad'} />
                                            <Text style={styles.text6}>USD</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <Text style={styles.text}>Description</Text>
                                    <View style={styles.view3}>
                                        <TextInput style={{ flex: 1, paddingHorizontal: 15, paddingTop: 12 }}
                                            multiline={true}
                                            placeholder={"Description"} />
                                    </View>
                                </View>
                                <View style={styles.trans}>
                                    <Text style={styles.text}> Transaction Fee: </Text>
                                    <Text style={styles.text5}>{gasPrice} MATIC</Text>
                                </View>
                                <View style={styles.trans}>
                                    <Text style={styles.text}> Transaction Fee: </Text>
                                    <Text style={styles.text5}>{percentageData}</Text>
                                </View>
                                <View style={{ flex: 1, marginTop: 15 }}>
                                    <Button onPress={_continue}
                                        text={'Continue'}
                                        styling={{ height: 52 }}
                                        textstyle={{ fontSize: 16, }}
                                    />
                                </View>
                            </View>

                            
                        </ScrollView>
                    }
                    {/* {Visible &&
                        <FlatList
                            data={currency}
                            renderItem={({ item }) => renderItem(item)}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{}}
                        />
                    } */}
                </>
            </SafeAreaView>
        </>
    )
}
export default SendBitcoin

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 17,
    },
    text: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 15,
    },
    text2: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
        marginTop: 15

    },
    list: {
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderBottomColor: colors.bordergray,
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        backgroundColor: colors.white
    },
    box: {
        height: 54,
        width: "100%",
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 29,

    },
    view: {
        height: 45,
        width: "100%",
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        alignItems: "center"

    },
    view4: {
        flexDirection: 'row',
        height: 45,
        width: "85%",
        borderColor: colors.black,
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    view5: {
        height: 45,
        width: "15%",
        borderColor: colors.black,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        alignItems: "center",
        justifyContent: "center",

    },
    view3: {
        height: 102,
        width: "100%",
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 6,
    },
    view2: {
        height: 45,
        width: "40%",
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 9
    },
    input: {
        color: colors.black,
        fontSize: 18,
        paddingLeft: 15,
    },
    text3: {
        color: colors.blue,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 18,
        paddingHorizontal: 5,
        flex: 1
    },
    text7: {
        color: colors.blue,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 18,
        marginLeft: 6,
    },
    text4: {
        color: colors.white,

        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
        marginTop: 20,
    },
    text5: {
        color: colors.black,
        fontSize: 12,
        fontFamily: Fonts.SourceSansProSemiBold,
    },
    text6: {
        color: colors.textlightgray,
        fontSize: 18,
        fontFamily: Fonts.SourceSansProRegular

    },
    img: {
        height: 21,
        width: 21,
    },
    img2: {
        height: 7,
        width: 12,
    },
    trans: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25, alignItems: "center",
        paddingRight: 17
    }


})