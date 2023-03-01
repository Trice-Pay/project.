import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Text, FlatList, StatusBar, ScrollView } from 'react-native';
import { Images } from '../../Res/Images';
import { CustomHeader } from '../../components/common/Header';
import { colors } from '../../Res/Colors';
import { StatusModal } from '../../components/StatusModal';
import { QRModal } from '../../components/QRModal';
import { Fonts } from '../../Res';
import Feather from 'react-native-vector-icons/Feather';
import { getBal, tokenTransfer, otherBalance } from '../../Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const BitcoinDetail = ({ navigation, route }) => {
    const {tokenSymbol,wallAddress,walletaddress,tokenAddress,decimals} = route?.params 
    const [active, setsctive] = useState("All")
    const [modalVisible, setModalVisible] = useState(false);
    const [QRVisible, setQRVisible] = useState(false);
    const {  amount, coinname,walletAd } = route?.params;
    const [getDetail, SetDetail] = useState();
    const [tokenBalance, setTokenBalance] = useState();
    const [walletAddress, setwalletaddress] = useState();
    const [trasactions, setTrasactions] = useState([]);
    const [wallName, setWallname] = useState('wallet');
    const[bal,setBal]=useState(0);
    console.log("tricpayData-->", tokenAddress, amount, coinname);
    // const getTrans = async () => {
    //     const availableList = await AsyncStorage.getItem('get_Trans_Lis').then(e=>{
    //        console.log(e,'get response --' ) 
    //     } ) 
    //     const list = JSON.parse(availableList)
    //     SetDetail(list)
    // }
    const fetchList = async () => {
        console.log("FAAAAAAAAAAA")
        const Address = await AsyncStorage.getItem('walletInfoList')

        const parsedList = await JSON.parse(Address);

        const rpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));
        var chainId=rpcData.chainId;
        let data = []
        console.log("Address--->", parsedList);
      await  axios.get(`https://api.covalenthq.com/v1/${chainId}/address/${wallAddress}/transactions_v2/?&key=ckey_247b49ef3e4345eca7cf719aa53`)
            .then(res => {
                // setCoins(res.data);
                console.log("TOKEN ADDRESS",tokenAddress.toLowerCase())
                if(tokenAddress=='NA'){
                    let tx = res.data.data.items.filter((item) => item.value>0);
                    console.log("Transaction Data",tx);
                    let log = tx.map((item) => {
                        var tValue=Number( item.value)/10 **18
                        var add=false;
                        if(item.toAddress===wallAddress){
                            add=true
                        }
                    let logs = {
                        fromAdress: item.from_address,
                        toAddress: item.to_address,
                        value: tValue,
                        recived:add,
                        txHash:item.tx_hash
                    }
                    data.push(logs)})
                }else{
                let tx = res.data.data.items.filter((item) => { return item.to_address == tokenAddress.toLowerCase() });
                console.log("TRANSACTION",tx)
              
                let log = tx.map((item) => {
                    console.log("LOG EVENT LENGHT",item)
                    if(item.log_events.length==2){
                   
                    var tValue=Number( item.log_events[1].decoded.params[2].value)/10 **18
                    var add=false;
                    if(item.toAddress===wallAddress){
                        add=true
                    }
                    let logs = {
                        fromAdress: item.from_address,
                        toAddress: item.to_address,
                        value: tValue,
                        recived:add,
                        senderName: item.log_events[1].sender_name,
                        txHash:item.tx_hash
                    }
                  
                    data.push(logs);
                }
                
                })
            }
                console.log("Final DATA", data);
               
                setTrasactions(data);
            }).catch(error => console.log(error))
    }

    const allTransac =  () => {
        fetchList();
       // console.log("all--->", trasactions);
        let data = [];
        let tx = trasactions.filter((item) => { return item.toAddress == tokenAddress.toLowerCase() });
       // console.log("all--->", tx);
        data.push(tx);
       // console.log("sendTransac--->", data);
        setTrasactions(tx);
    }
   
    const walletAddData = async()=>{
        const availableList = await AsyncStorage.getItem('walletInfoList');
    
        let key = JSON.parse(availableList)
        const sAddress = await AsyncStorage.getItem('selectedAddress')
        let walletN= key[sAddress-1].address;
        console.log(key)
        console.log("walletAddress--->",walletN);
        setWallname(walletN);

    }

    const sendTransac =  () => {
        fetchList();
        //console.log("sendTransac--->", trasactions);
        let data = [];
        let tx = trasactions.filter((item) => { return item.toAddress == tokenAddress.toLowerCase() });
       // console.log("sendTransac--->", tx);
        data.push(tx);
        //console.log("sendTransac--->", data);
        setTrasactions(tx);
    }

    const receiveTransac = () => {
       // console.log("recive--->", trasactions);
        let data = [];
        let tx = trasactions.filter((item) => { return item.fromAdress == tokenAddress.toLowerCase() });
       // console.log("reciveTransac-txtx-->", tx);
        data.push(tx);
      //  console.log("reciveTransac--->", data);
        setTrasactions(tx);
    }

    useEffect(() => {
        fetchList();
        _getBalance();
        walletAddData();
    }, [tokenAddress])

    const _getBalance = async () => {
        console.log("GETTING BALANCE OF tokenAddress--->",tokenAddress)
        if (tokenAddress ) {
            console.log("tokenAddress--->",wallAddress)
            if(tokenAddress==='NA'){
             getBal(wallAddress).then(e => {
                setBal(e)
          
            })
        
            }else{

          
            otherBalance(wallAddress,tokenAddress,decimals ).then(e => {
                setBal(e)
                console.log(e,"Balance-->")
            })
        }
        // try {
        //     await otherBalance(tokenAddress).then(res => {
              
               
        //         if(!res){setTokenBalance(0); return}
        //         setTokenBalance(Number(res) / 10 ** 18);
        //     })

        // }
        // catch { err => console.log(err) }
    }
    }

    const Data = [
        {
            id: 1,
            bitcoinstatus: "Sent polygon",
            status: "Success",
            BTC: "-0.00142263 MATIC",
            amount: "-$12.50",
            img: 'arrow-up-right'
        },
        // {
        //     id: 2,
        //     bitcoinstatus: "Received Bitcoin",
        //     status: "Success",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'download'
        // },
        // {
        //     id: 3,
        //     bitcoinstatus: "Received Bitcoin",
        //     status: "Success",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'download'
        // },
        // {
        //     id: 4,
        //     bitcoinstatus: "Deposit Bitcoin",
        //     status: "Cancel",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'credit-card'
        // },
        // {
        //     id: 5,
        //     bitcoinstatus: "Received Bitcoin",
        //     status: "Pending",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'download'
        // },
        // {
        //     id: 6,
        //     bitcoinstatus: "Sent Bitcoin",
        //     status: "Success",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'arrow-up-right'
        // },
        // {
        //     id: 7,
        //     bitcoinstatus: "Sent Bitcoin",
        //     status: "Success",
        //     BTC: "-0.00142263 BTC",
        //     amount: "-$12.50",
        //     img: 'arrow-up-right'
        // },
    ]

   


    const render = (item) => {
        var arrow_down_right='arrow-up-right';
        console.log("RECE",item.recived)
        if(item.recived){
            arrow_down_right='arrow-down-right';
        }
        return (
           
            <TouchableOpacity style={styles.flatlist} >
                <Feather name={arrow_down_right}
                    color={colors.blue} size={15}
                    style={{ borderWidth: 1, padding: 6, borderRadius: 15, borderColor: colors.blue }} />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <View style={{ justifyContent: "space-between" }}>
                        <Text style={styles.btc}>Hash: {item.txHash} </Text>
                        {/* <Text style={styles.btc}>To:   {item.toAddress} </Text> */}
                        {/* <Text style={styles.btc} > {item.senderName} </Text> */}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 3 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {/* <View style={[styles.dot,
                            {
                                backgroundColor: item?.status === "Pending" ? colors.yellow :
                                    item?.status === "Cancel" ? colors.red : colors.green
                            }]} /> */}
                            <Text style={styles.btc} > {item.senderName} </Text>
                        </View>

                        <Text style={styles.btc}>{item.value} </Text>

                    </View>
                </View>
                <Image source={Images.arrowright} style={{ tintColor: colors.blue }} />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
                <CustomHeader text={tokenSymbol || "Ether"} back />
                <View style={styles.container}>
                    <View style={styles.view}>
                        <Image source={Images.polygon} style={{ width: 68, height: 68 }} />
                        <Text style={styles.text}> {parseFloat(bal).toFixed(4)}</Text>
                    </View>
                    <View style={styles.btnview}>
                        <TouchableOpacity style={[styles.btn,
                        { backgroundColor: active !== "All" ? colors.white : colors.skyblue }]}
                            onPress={() => {setsctive("All"),allTransac()}} >
                            <Text style={[styles.btntext,
                            {
                                color: active !== "All" ? colors.black : colors.white, fontFamily: Fonts.SourceSansProSemiBold
                            }]}> All </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,
                        { backgroundColor: active !== "Sent" ? colors.white : colors.skyblue }]}
                            onPress={() => { setsctive("Sent"), sendTransac() }}>
                            <Text style={[styles.btntext,
                            { color: active !== "Sent" ? colors.black : colors.white }]}> Sent </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,
                        { backgroundColor: active !== "Received" ? colors.white : colors.skyblue }]}
                            onPress={() => { setsctive('Received'), receiveTransac() }} >
                            <Text style={[styles.btntext,
                            { color: active !== "Received" ? colors.black : colors.white }]}> Received </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.btn,
                        { backgroundColor: active !== "Deposit" ? colors.white : colors.skyblue }]}
                            onPress={() => setsctive('Deposit')}>
                            <Text style={[styles.btntext,
                            { color: active !== "Deposit" ? colors.black : colors.white }]}> Deposit </Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ marginBottom: "68%" }}>
                        <FlatList
                            data={trasactions}
                            renderItem={({ item }) => render(item)}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.con}
                        />
                    </View>
                    <View style={styles.last}>
                        <View style={styles.sendview}>
                            <TouchableOpacity style={{ alignItems: "center" }}
                                onPress={() => navigation.navigate('SendBitcoin', { tokenAddress: tokenAddress, type: "tokenAdrs", tokenBalance: tokenBalance })}>
                                <Image source={Images.send} />
                                <Text style={styles.sendtext}> Send </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}
                                onPress={() => setQRVisible(true)}>
                                <Image source={Images.receive} />
                                <Text style={styles.sendtext}> Receive </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={() => navigation.navigate('crypto_currencies', { SelectedWallet :tokenAddress})}style={{ alignItems: "center" }}>
                                <Image source={Images.buy} />
                                <Text style={styles.sendtext}> Buy </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <StatusModal Visible={modalVisible} setModalVisible={setModalVisible} />
                <QRModal Visible={QRVisible} setModalVisible={setQRVisible}
                    walletaddress={wallName} SelectedWallet={wallName} />
            </SafeAreaView>
        </>
    )

}
export default BitcoinDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    view: {
        backgroundColor: colors.blue,
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30

    },
    text: {
        fontSize: 39,
        marginTop: 7,
        color: colors.white,
        fontFamily: Fonts.SourceSansProLight
    },
    btnview: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 20,
        paddingEnd: 34,
        marginTop: 14
    },
    btn: {
        backgroundColor: colors.skyblue,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 17,
    },
    btntext: {
        color: colors.white,
        fontSize: 15
    },
    flatlist: {
        flexDirection: "row",
        paddingHorizontal: 17,
        paddingVertical: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: colors.borderlightgray,
    },
    sent: {
        fontSize: 15,
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    status: {
        fontSize: 13,
        color: colors.textlightgray,
        marginLeft: 4,
        fontFamily: Fonts.SourceSansProRegular


    },
    btc: {
        fontSize: 12,
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold

    },
    Amount: {
        fontSize: 11,
        color: colors.textlightgray,
        fontFamily: Fonts.SourceSansProRegular

    },
    dot: {
        width: 8, height: 8, borderRadius: 10
    },
    last: {
        backgroundColor: colors.blue,
        height: 73,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0
    },
    sendview: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 18
    },
    con: {
        marginTop: 18, borderTopWidth: 1, borderTopColor: colors.borderlightgray, paddingBottom: 30
    },
    sendtext: {
        fontSize: 16,
        top: 8,
        color: colors.white,
        fontFamily: Fonts.SourceSansProRegular

    },



})