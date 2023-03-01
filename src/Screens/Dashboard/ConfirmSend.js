import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { Button, CustomHeader, Header } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import { getTrans, sendTrans, waitTrans ,tokenTransfer} from '../../Utils';
import Toast from 'react-native-toast-message'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { exchange_Covalent_Trans_List } from '../../redux/actions/needs.actions';


const ConfirmSend = ({ navigation, route }) => {
    const { ScanAddress, amount, walletKey, gasPrice,percentageData,tokenAddress,type} = route?.params || {}
    const [isLoading, setLoading] = useState(false)
    // const isLoading = useSelector(state => state.users.isRequesting)
    const dispatch = useDispatch()


    const _send = async () => {
        // if(type=="tokenAdrs"){
            setLoading(true)
            try {
                console.log("Init Sending,")
                if(tokenAddress==="NA"){
                    console.log("Init Sending Coin")
                    await sendTrans(ScanAddress, amount).then(res => {
                        console.log(res, 'hash --------- res ---')
                        // waitTrans(res?.hash).then((e)=>{
                        //     console.log(e,'wait response --' ) 
        
                            if (res) {
                            dispatch(exchange_Covalent_Trans_List(
                                
        
                                    {
                                        chainId: res?.chainId,
                                        txHash: res?.hash
                                    })).then((res) => {
                                        console.log(res, 'get trans---res --')
                                    })
                            }
                        // waitTrans(res?.hash)
                        // } )
        
                    })
                }
                else{

              
               await tokenTransfer(ScanAddress, amount, tokenAddress).then(res => {
                    console.log(res, 'hash --------- res ---')
                    // waitTrans(res?.hash).then((e)=>{
                    //     console.log(e,'wait response --' ) 
    
                        if (res) {
                        dispatch(exchange_Covalent_Trans_List(
                            
    
                                {
                                    chainId: res?.chainId,
                                    txHash: res?.hash
                                })).then((res) => {
                                    console.log(res, 'get trans---res --')
                                })
                        }
                    // waitTrans(res?.hash)
                    // } )
    
                })
            }
                setLoading(false)
                Toast.show({
                    text1: 'Transaction Send.',
                })
                navigation.navigate('Wallet');
                // navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0,
                //         routes: [
                //             {
                //                 name: 'CompleteTrans',
                //                 params: { tokenAddress: tokenAddress },
                //             },
                //         ],
                //     })
                // )
            }
            catch { err => console.log(err) }
        }
        
        // else{
        //     setLoading(true)
        //     try {
               
        //         setLoading(false)
        //         Toast.show({
        //             text1: 'Transaction Send.',
        //         })
        //         navigation.dispatch(
        //             CommonActions.reset({
        //                 index: 0,
        //                 routes: [
        //                     {
        //                         name: 'CompleteTrans',
        //                     },
        //                 ],
        //             })
        //         )
        //     }
        //     catch { err => console.log(err) }
        // }
       
    

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <Loader isLoading={isLoading} />
                <CustomHeader text={"Confirm Send"} back />
                <View style={styles.containter}>
                    <Text style={styles.text}>Transaction Detail </Text>
                    <View style={styles.box}>
                        <Text style={styles.text2}>Currency </Text>
                        <Text style={styles.text3}>TRICE PAY</Text>
                    </View>
                    <View style={styles.box2}>
                        <View style={{}}>
                            <Text style={styles.text2}>To </Text>
                            <Text style={styles.text3}>{ScanAddress}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.box2}>
                        <Text style={styles.text2}>TOKEN </Text>
                        <Text style={styles.text3}>{amount}</Text>
                    </View>
                    <View style={styles.box3}>
                        <Text style={styles.text2}>Transaction Fee </Text>
                        <Text style={styles.text3}>{gasPrice} MATIC (0.12 USD)</Text>
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <Button
                            text={"Confirm & Send"}
                            styling={{ height: 52 }}
                            textstyle={{ fontSize: 16, }}
                            onPress={_send} />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )


}
export default ConfirmSend

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 17
    },
    box: {
        height: 69,
        width: "100%",
        borderWidth: 1,
        marginTop: 6,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        paddingHorizontal: 20,
        justifyContent: "center"

    },
    box2: {
        height: 69,
        width: "100%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        paddingHorizontal: 20,
        justifyContent: "center"
    },
    box3: {
        height: 69,
        width: "100%",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        paddingHorizontal: 20,
        justifyContent: "center"
    },
    text: {
        color: colors.black,
        marginTop: 21,
        fontSize: 16,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    text2: {
        color: colors.blue,
        fontSize: 15,
        fontFamily: Fonts.SourceSansProSemiBold

    },
    text3: {
        color: colors.black,
        fontSize: 14,
        lineHeight: 22,
        fontFamily: Fonts.SourceSansProRegular

    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
        marginTop: 20

    }
})