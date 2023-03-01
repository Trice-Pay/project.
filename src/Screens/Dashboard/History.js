
import React,{useState,useEffect} from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity,FlatList,StatusBar } from 'react-native';
import { CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors} from '../../Res/Colors';
import { Images } from '../../Res/Images';
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const TransactionHistory = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetchList()
    },[])
    const fetchList = async () => {
        console.log("FAAAAAAAAAAA")
        const Address = await AsyncStorage.getItem('walletInfoList')

        const parsedList = await JSON.parse(Address);
        const sAddress = await AsyncStorage.getItem('selectedAddress')
        const rpcData = JSON.parse(await AsyncStorage.getItem('trice_rpc_data'));
        var chainId=rpcData.chainId;
        let data = []
        console.log("Address--->", parsedList);
      await  axios.get(`https://api.covalenthq.com/v1/${chainId}/address/${sAddress}/transactions_v2/?&key=ckey_247b49ef3e4345eca7cf719aa53`)
            .then(res => {
                // setCoins(res.data);
                // console.log("TOKEN ADDRESS",tokenAddress.toLowerCase())
               
                let tx = res.data.data.items;
                console.log("TRANSACTION",tx)
              
                let log = tx.map((item) => {
                    console.log("LOG EVENT LENGHT",item)
                    var tValue=Number( item.value)/10 **18
                        var add=false;
                      
                    let logs = {
                        fromAdress: item.from_address,
                        toAddress: item.to_address,
                        value: tValue,
                        recived:add,
                        txHash:item.tx_hash
                    }
                  
                    data.push(logs);
                
                
                })
            
                console.log("Final DATA", data);
               
                setData(data);
            }).catch(error => console.log(error))
    }

    // const render = (item) => {
    //     return (
    //         <TouchableOpacity style={styles.flatlist}>
    //             <Feather name={item.img}
    //                 color={colors.blue} size={15}
    //                 style={{ borderWidth: 1, padding: 6, borderRadius: 15, borderColor: colors.blue }} />
    //             <View style={{ flex: 1, paddingHorizontal: 15 }}>
    //                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    //                     <Text style={styles.sent}>{item.bitcoinstatus} </Text>
    //                     <Text style={styles.btc} > {item.BTC} </Text>
    //                 </View>
    //                 <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 3 }}>
    //                     <View style={{ flexDirection: "row", alignItems: "center" }}>
    //                         <View style={[styles.dot,
    //                         {
    //                             backgroundColor: item?.status === "Pending" ? colors.yellow :
    //                                 item?.status === "Cancel" ? colors.red : colors.green
    //                         }]} />
    //                         <Text style={styles.status}> {item.status} </Text>
    //                     </View>

    //                     <Text style={styles.Amount}> {item.amount} </Text>
    //                 </View>
    //             </View>
    //             <Image source={Images.arrowright} style={{ tintColor: colors.blue }} />
    //         </TouchableOpacity>
    //     )
    // }
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
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Transaction History"} back />
                <View style={styles.container}>
                <View>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => render(item)}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.con} />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )

}
export default TransactionHistory
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    flatlist: {
        flexDirection: "row",
        paddingHorizontal: 17,
        paddingVertical: 16,
        alignItems: "center",
        borderBottomWidth:1,
        borderColor:colors.borderlightgray,
    },
    sent: {
        fontSize: 15,
        color: colors.black,
        fontFamily:Fonts.SourceSansProSemiBold
    },
    status: {
        fontSize: 13,
        color: colors.textlightgray,
        marginLeft: 4,
        fontFamily:Fonts.SourceSansProRegular
    },
    btc: {
        fontSize: 12,
        color: colors.black,
        fontFamily:Fonts.SourceSansProSemiBold
    },
    Amount: {
        fontSize: 11,
        color: colors.textlightgray,
        fontFamily:Fonts.SourceSansProSemiBold

    },
    dot: {
        width: 8, height: 8, borderRadius: 10
    },
    con:{
        paddingBottom:8
    }

}) 
