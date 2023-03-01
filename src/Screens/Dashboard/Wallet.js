import React, { useEffect, useState, useRef } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar, } from 'react-native';
import { QRModal } from '../../components/QRModal';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker'
import { getBal, tokenTransfer } from '../../Utils';
import axios from 'axios';
import tricepayABI from '../../common/TricepayABI';
import { getTrans, sendTrans, waitTrans, sendOther, otherBalance } from '../../Utils';

const Wallet = ({ navigation, route }) => {
    const { name, wallAddress, wallprivateKey } = route?.params || {}
    const [QRVisible, setQRVisible] = useState(false);
    const [walletaddress, setwalletaddress] = useState('');
    const [privateKeyData, setprivateKeyData] = useState('')
    const [tokenBal, setTokenBal] = useState('');
    const imagePickerRef = useRef()
    const [SelectedWallet, setSelected] = useState();
    const [bal, SetBal] = useState()
    const [coins, setCoins] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [wallName, setWallname] = useState('wallet');
    const [showNetwork, setShowNetwork] = useState('')
    const [tokenDetail, settokenDetail] = useState([])
    const [sumOfAllAssets, setSumOfAllAssets] = useState(0)
    const [currencyData, setCurrencyData] = useState([])
    const [wAddress,setwAddress]=useState([])

    console.log(SelectedWallet, 'selected')
    console.log(walletaddress, 'get state list ---')
    const getCurrencyData = async () => {
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                // setCoins(res.data);
                setCurrencyData((prevState) => {
                    prevState = res.data
                    return [...prevState]
                })
                console.log("coinsData-->", res.data);
            }).catch(error => console.log(error))
    }
    const _checkRpcData = async () => {
        console.log("Checking RPC")
        const rpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));
        setShowNetwork(rpcData.symbol)
        console.log("RPC DATA", rpcData)
        let x = JSON.parse(await AsyncStorage.getItem('Gen_token_user_data'))
        console.log("TOKEN DATA", x)
    }

    const _balance = async () => {
        if (SelectedWallet || walletaddress[0]?.address) {
            await getBal(SelectedWallet || walletaddress[0]?.address).then(e => {
                SetBal(e)
                console.log(e, "Balance-->")
            })
        }
    }

    useEffect(() => {
        getCurrencyData()
        // _tokenBalace()
        _checkRpcData()
        tokendataDetail()

    }, [SelectedWallet])

    const _tokenBalace = async () => {

        try {
            let addresCoin = "0x5D599A4b14BbfDAAe38c0e92851B575F82C8c999";
            await otherBalance(addresCoin).then(res => {

                console.log(Number(res) / 10 ** 18, 'balanceoftokon--data---->');
                if (!res) { setTokenBal(0); return }
                setTokenBal(Number(res) / 10 ** 18);
            })

        }
        catch { err => console.log(err) }
    }








    // useEffect(() => {
    //     _balance();
    //     _tokenBalace();
    // }, [SelectedWallet, walletaddress, bal])

    const fetchList = async () => {
        const Address = await AsyncStorage.getItem('walletInfoList');
        console.log("WallletAddd-->", JSON.parse(Address), Address);
        if (Address) {
            const parsedList = JSON.parse(Address);
            setwalletaddress(parsedList)
        }
    }





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchList()
        });
        return unsubscribe;
    }, [navigation])

    useEffect(async () => {

        const Address = await AsyncStorage.getItem('walletInfoList');
        console.log("WallletAddd-->", JSON.parse(Address), Address);
        if (Address) {
            const parsedList = JSON.parse(Address);
            setwalletaddress(parsedList)
        }

    }, [])


    useEffect(() => {
    }, [walletaddress])
    useEffect(() => {
    }, [walletaddress])
    const choose = () => {
        imagePickerRef.current.focus()
    }

    const copyToClipboard = () => {
        Clipboard.setString(SelectedWallet || walletaddress[0]?.address);
        Toast.show({
            text1: 'Copied..',
        })
    };

    const walletName = async () => {
        const availableList = await AsyncStorage.getItem('walletInfoList');

        let key = JSON.parse(availableList)
        const sAddress = await AsyncStorage.getItem('selectedAddress')
        let walletN = key[sAddress - 1].walletName;
        console.log(key)
        console.log("walletName", walletN);
        setWallname(walletN);
    }
    const addToState = async (tokenAddress, tokenSymbol, tokenDecimal) => {
        setSumOfAllAssets(0)
      //  var _wallAddress = wallAddress;
        // if (wallAddress === undefined) {
            console.log("in STATE undefined")
            const availableList = JSON.parse(await AsyncStorage.getItem('walletInfoList'));
            console.log("Checking avalable list", availableList)
            var key = availableList;
            console.log("FIND value", key)

            let walletN = key[0].address;
            console.log("UPDATE", walletN)
         var   _wallAddress = walletN

       // }
        let sTokenAddress = await AsyncStorage.getItem('selectedAddress')
        console.log(`Selected Address ${sTokenAddress} for Token`, tokenAddress)
        const dd = tokenDetail;
        let balance;
        var _image;
        if (tokenAddress === 'NA') {
            console.log("WWWWWW", _wallAddress)
            await getBal(_wallAddress).then(e => {
                SetBal(e)
                var usdtValue = 0;
                let coinData = currencyData;
                console.log("AS", coinData)
                if (currencyData.length > 0) {
                    var usdtData = JSON.stringify(coinData.filter(x =>
                        x.symbol === 'eth'
                    ))
                    if (usdtData.length > 0) {
                        var _data = JSON.parse(usdtData);
                        _image = _data[0].image
                        console.log(`USDT CR  ${JSON.stringify(usdtData)}`, _data[0].current_price)
                        if (parseFloat(e) > 0) {
                            usdtValue = parseFloat(_data[0].current_price) / parseFloat(e)

                        }
                    }
                }
                dd.push({ tokenAddress, tokenSymbol, tokenDecimal, balance: e, usdtValue: parseFloat(usdtValue).toFixed(2) })

                settokenDetail((prevState) => {
                    prevState.push({ img: _image, tokenAddress, tokenSymbol, tokenDecimal, balance: parseFloat(e).toFixed(7), usdtValue: parseFloat(usdtValue).toFixed(2) })
                    return [...prevState]
                })
                var usdtValue = usdtValue + sumOfAllAssets;
                setSumOfAllAssets(usdtValue)
            })

        } else {
            await otherBalance(sTokenAddress, tokenAddress, tokenDecimal).then(e => {
                console.log("IN LLOOP", e)
                balance = e
                dd.push({ tokenAddress, tokenSymbol, tokenDecimal, balance })
                console.log("AFTER DATA ADDED", dd)
                settokenDetail((prevState) => {
                    prevState.push({ tokenAddress, tokenSymbol, tokenDecimal, balance })
                    return [...prevState]
                })
                console.log("NEW STATE", tokenDetail)
            })
        }

    }
    const tokendataDetail = async () => {


        var _wallAddress = wallAddress;
        const tokenData = await AsyncStorage.getItem('Gen_token_user_data');
        console.log("WALLET ADD TEST", wallAddress)
        if (wallAddress === undefined) {
            console.log("Enter for undefi")
            const availableList = JSON.parse(await AsyncStorage.getItem('walletInfoList'));
            console.log("Checking avalable list", availableList)
            var key = availableList;
            console.log("FIND value", key)

            let walletN = key[0].address;
            console.log("UPDATE", walletN)
            _wallAddress = walletN

            await AsyncStorage.setItem('selectedAddress',_wallAddress)

        }
        setwAddress(_wallAddress)
        console.log("TokenasyncData--->", JSON.parse(tokenData))
        settokenDetail((prevState) => {
            prevState = [];
            return [...prevState]
        });
        let ds = [];
        let dd = [];
        let ddd = [];
        if (tokenData != null) {

            ds = [...JSON.parse(tokenData)];
            console.log("FINAL", ds)


            const rpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));

            ddd = ds.filter(item =>
                item.walletAddress === _wallAddress && item.network === rpcData.symbol
            )

            //Here check network and create native coin index

            //  ddd.push({balance:0,tokenAddress:'NA',tokenDecimal:18,tokenSymbol:'ETH'}) 
            console.log("ETH ADDED", ddd)
            for (var i = 0; i < ddd.length; i++) {
                console.log("LOOP", 1)
                await addToState(ddd[i].tokenAddress, ddd[i].tokenSymbol, ddd[i].tokenDecimal)
            }
        } else {
            // ddd.push({balance:0,tokenAddress:'NA',tokenDecimal:18,tokenSymbol:'ETH'})
            for (var i = 0; i < ddd.length; i++) {
                await addToState(ddd[i].tokenAddress, ddd[i].tokenSymbol, ddd[i].tokenDecimal)
            }
        }
        //     dd = ds.filter(function(item){
        //         return wallAddress==item.walletAddress;
        //      }).map(async function({tokenAddress, tokenSymbol, tokenDecimal}){
        //         let _balance;

        //           return {tokenAddress, tokenSymbol, tokenDecimal,balance:_balance};

        //      })

        //         Promise.then(dd=>dd.data)


        //   console.log("DDDDDDDDDDDD",dd.length)
        //     settokenDetail(dd);


    }
    const render = (item) => {
        console.log("item", item)
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("BitcoinDetail", { tokenAddress: item.tokenAddress, tokenSymbol: item.tokenSymbol, wallAddress: wAddress, walletaddress: wAddress, decimals: item.tokenDecimal }) }} 
            style={{  padding: 10, height: 81, borderRadius: 13, marginTop: 10 }}>
                <View style={{ flexDirection:'row', height:80, padding: 5,borderBottomColor:'#e2e2e2',borderBottomWidth:1 }}>
                    <View style={{ flex: .5 }}>
                        <Image source={Images.BTN} style={{ width: 24, height: 24 }} />
                    </View>
                   
                    <View style={{ flex: 4 }}>
                        <View style={{ paddingStart: 10 }}>
                            <Text style={{ fontSize: 18, fontFamily: Fonts.SourceSansProSemiBold, color: colors.black }}>{item.tokenSymbol} </Text>

                        </View>
                    </View>
                    <View style={{ flex: 4 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontFamily: Fonts.SourceSansProSemiBold, color: colors.black }}>{item.balance} </Text>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={{ fontSize: 13, color: colors.textlightgray, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}> ${item.usdtValue} </Text>

                        </View>
                    </View>
</View>
</View>

                   


                    {/* <View style={{ backgroundColor: "#1D122A", width: 48, height: 48, justifyContent: "center", alignItems: "center", borderRadius: 14, marginTop: 5 }}><Image style={{ height: 24, width: 24 }} source={{ uri: item.img }} ></Image></View>
            <View style={{ marginLeft: 18, width: 100,flex:1,alignItems:'center',justifyContent:'center' }}>
                <Text style={{ fontsize: 17, color: "#ffffff", marginTop: 8 }}>{item.tokenSymbol}</Text>
               
            </View>
            <View style={{ marginLeft: "10%", width: 90,height:`100%` }}>
               
                <View style={{ flex:1, justifyContent:'center' }}>
                    <View style={{flex:1}}>
                    <Text style={{ fontsize: 12, color: "#D7BFF5", marginTop: 3 }}>{item.balance}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{ fontsize: 12, color: "#D7BFF5", marginTop: 3 }}>${item.usdtValue}</Text> 
                    </View>
                </View>
            </View>
            <View style={{ marginLeft: "5%", justifyContent: "center", alignItems: "center", width: 50 }}>
                <Image style={{ height: 12, width: 7 }} source={Images.midLeft} ></Image>
            </View> */}
            </TouchableOpacity>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={choose}>
                            <View style={styles.walletview}>
                                <Text style={styles.text}>{wallName} </Text>
                                <Image source={Images.arrows} style={{ marginLeft: 6 }} />
                            </View>
                            <Text style={styles.txt}> {showNetwork} </Text>
                        </TouchableOpacity>
                        <View style={styles.scan}>
                            <TouchableOpacity onPress={() => navigation.navigate('AddWallet')}>
                                <Image
                                    source={Images.plus} style={{ marginRight: 10, height: 26, width: 26, marginBottom: 4 }} />
                            </TouchableOpacity>
                            <Image source={Images.scanner} style={{ marginRight: 10, height: 24, width: 24, }} />
                            <TouchableOpacity onPress={() => navigation.navigate('AddToken')}>
                                <Image source={Images.add} style={{ height: 24, width: 24, }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.secondview}>
                        <Text style={styles.curr}>Current Balance </Text>
                        <Text style={styles.price} numberOfLines={1}>{bal} </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                            <View style={[styles.code, { maxWidth: 120 }]}>
                                <Text style={styles.textcode} numberOfLines={1}>{SelectedWallet || walletaddress[0]?.address}</Text>
                            </View>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Image source={Images.copy} style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('EditWallet', { SelectedWallet, walletaddress })} >
                                <Image source={Images.setting} style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sendview}>
                            <TouchableOpacity style={{ alignItems: "center" }}
                                onPress={() => navigation.navigate('SendBitcoin', { SelectedWallet, walletaddress, bal })}>
                                <Image source={Images.send} />
                                <Text style={styles.sendtext}> Send </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}
                                onPress={() => setQRVisible(true)}
                            // onPress={()=>_send("0xaA89b450b023763f5B30a4326681Da0D13930e2d","100","0x3236A63c21Fc524a51001ea2627697fDcA86E897")}
                            >
                                <Image source={Images.receive} />
                                <Text style={styles.sendtext}> Receive </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}
                                onPress={() => navigation.navigate('crypto_currencies', { SelectedWallet, walletaddress })}>
                                <Image source={Images.buy} />
                                <Text style={styles.sendtext}> Buy </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.lastview}>
                        <Text style={styles.title}> My Portfolio </Text>
                        <FlatList
                            data={tokenDetail}
                            extraData={tokenDetail}
                            renderItem={({ item }) => render(item)}
                            keyExtractor={(item) => item.tokenSymbol}
                        />
                        {/* <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 31, paddingHorizontal: 20 }}
                            onPress={() => navigation.navigate('BitcoinDetail', {coinname:" TRICEPAY", tokenAddress: "0x5D599A4b14BbfDAAe38c0e92851B575F82C8c999",amount:"100",walletAd:SelectedWallet || walletaddress[0]?.address })}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={Images.BTN} style={{ width: 24, height: 24 }} />
                                <View style={{ paddingStart: 10 }}>
                                    <Text style={{ fontSize: 18, fontFamily: Fonts.SourceSansProSemiBold, color: colors.black }}>TricePay </Text>
                                    <Text style={{ fontSize: 13, color: colors.textlightgray, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}> TRICEPAY </Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, fontFamily: Fonts.SourceSansProSemiBold, color: colors.black }}>{tokenBal} </Text>
                                <View style={{ flexDirection: "row" }}>

                                    <Text style={{ fontSize: 13, color: colors.textlightgray, fontFamily: Fonts.SourceSansProRegular, lineHeight: 20 }}>  </Text>

                                </View>
                            </View>
                        </TouchableOpacity> */}
                        {/* <FlatList
                            data={coins}
                            renderItem={({ item, index }) => renderlist(item, index)}
                            keyExtractor={item => item.id}
                        /> */}
                    </View>
                </View>
                <QRModal Visible={QRVisible} setModalVisible={setQRVisible}
                    walletaddress={walletaddress} SelectedWallet={SelectedWallet} />
                <Picker
                    ref={imagePickerRef}
                    style={{ display: 'none' }}
                    selectedValue={''}
                    onValueChange={async(itemValue, itemIndex) => {
                        setSelected(itemValue)
                        console.log("indexValue--->", itemValue)
                      await  AsyncStorage.setItem('selectedAddress', itemIndex.toString())
                        _tokenBalace()
                        walletName()
                        tokendataDetail()
                    }}>
                    <Picker.Item label={'Select Wallet'} value={''} />
                    {walletaddress ?
                        walletaddress?.map(item =>
                            <Picker.Item label={item?.walletName} value={item?.address} key={item} />) : null
                    }
                </Picker>
            </SafeAreaView>
        </>
    )

}

export default Wallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.blue,
    },
    text: {
        fontSize: 22,
        color: colors.white,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    txt: {
        color: colors.white,
        fontSize: 11,
        fontFamily: Fonts.SourceSansProRegular
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 22,
        paddingEnd: 18
    },
    walletview: {
        flexDirection: "row", alignItems: "center"
    },
    scan: {
        flexDirection: "row", alignItems: "center"
    },
    curr: {
        color: colors.white,
        fontSize: 18,
        fontFamily: Fonts.SourceSansProLight
    },
    price: {
        fontSize: 42,
        color: colors.white,
        fontFamily: Fonts.SourceSansProLight,
        marginTop: 5,
    },
    secondview: {
        alignItems: "center",
        marginTop: 19,
    },
    code: {
        backgroundColor: colors.darkblue,
        borderRadius: 20,
        paddingHorizontal: 19,
        paddingVertical: 5,
    },
    textcode: {
        color: colors.white,
        fontSize: 13,
        fontFamily: Fonts.SourceSansProLight,
    },
    sendview: {
        flexDirection: "row", width: "100%", justifyContent: "space-evenly", marginTop: 33
    },
    sendtext: {
        fontSize: 16,
        marginTop: 8,
        color: colors.white,
        fontFamily: Fonts.SourceSansProRegular
    },
    lastview: {
        flex: 1,
        marginTop: 22,
        backgroundColor: colors.white,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30
    },
    title: {
        marginTop: 22,
        marginStart: 14,
        fontSize: 22,
        fontFamily: Fonts.SourceSansProBold,
        color: colors.lightblack
    }



}) 