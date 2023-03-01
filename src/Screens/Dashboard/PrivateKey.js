import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TextInput } from 'react-native';
import { Button, CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { cleanSingle } from 'react-native-image-crop-picker';
import {TRICE_PAY_CONTRACT} from "../../configs/tricepaycontract"
const PrivateKey = ({ navigation, route }) => {
    const { type } = route?.params
    const [privateKey, setkey] = useState('');

    const key = async()=>{
        if(type === "PrivateKey"){
         // let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
        let wallet = new ethers.Wallet(privateKey);
        console.log("wallet--->",wallet);
         // Connect a wallet to mainnet
        let provider = ethers.getDefaultProvider();
        let walletWithProvider = new ethers.Wallet(privateKey, provider);
       
      
        // await AsyncStorage.setItem('privateKeydata',JSON.stringify(productToBeSaved));
        // console.log("walletWithProvider--->",walletWithProvider);
        const availableList = await AsyncStorage.getItem('walletInfoList');
        let updatedList = [];
       
        if (availableList) {
        updatedList = [...JSON.parse(availableList)];
        }
        const productToBeSaved = {"address":walletWithProvider.address,"walletName":'Import Wallet',
        "walletPass":'', "walletConfirmPass":'',
        "privateKey":privateKey}
        updatedList.push(productToBeSaved);
        console.log("updatedList--->>>>",updatedList);
        await AsyncStorage.setItem('walletInfoList',JSON.stringify(updatedList));
       
        const availableList1 = await AsyncStorage.getItem('walletInfoList');
        console.log("LLLLLLLLL",availableList1)
        //Add Default Native Token and Default Trice Pay token
   

        let data = [];
        //Store Default Matic and Trice Pay contract
        let tempWallet = [];
            let x= JSON.parse(await AsyncStorage.getItem('Gen_token_user_data'))
            tempWallet = x;
            tempWallet?.map(item => {
                data.push(item);
            });
            const rpcData =JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
            data.push({network:rpcData.symbol, tokenAddress: 'NA', tokenSymbol:'MATIC',tokenDecimal:TRICE_PAY_CONTRACT.DECIMALS,walletAddress:wallet.address});
            data.push({network:rpcData.symbol, tokenAddress: TRICE_PAY_CONTRACT.CONTRACT, tokenSymbol:TRICE_PAY_CONTRACT.SYMBOL,tokenDecimal:TRICE_PAY_CONTRACT.DECIMALS,walletAddress:wallet.address});
            await AsyncStorage.setItem('Gen_token_user_data', JSON.stringify(data))
          
            console.log("WallletAddd-->",updatedList);
           navigation.navigate('BottomTabs');
        
        // const parsedList = JSON.parse(Address._w);
        // console.log("Address--->>>>",Address);
    }
    else{
        console.log("hello");
    }

    // useEffect(()=>{
    //     const Address = AsyncStorage.getItem('privateKeydata');
    //     console.log(Address,"address here")
    // },[])
}
   
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={type === "PrivateKey" ? "By Private Key" : "By Mnemonic Phrase"} back />
                <View style={styles.containter}>
                    <View>
                        <Text style={styles.text}>{type === "PrivateKey" ? "Enter Private Key" : "Please enter mnemonic phrases and separated them by a space"} </Text>
                        <TextInput
                            style={styles.view} multiline={true} placeholder={"Enter Key"}
                            onChangeText={(k) => setkey(k)}  >
                        </TextInput>
                        <View style={{ marginTop: 34 }}>
                            <Button
                                text={'Start Import'}
                                styling={{ backgroundColor: colors.darkblue, height: 52 }}
                                textstyle={{ fontSize: 16, fontWeight: "600" }}
                                onPress={() => {key()}}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}
export default PrivateKey

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: colors.black,
        fontFamily: Fonts.SourceSansProSemiBold,
        fontSize: 16,
        marginTop: 26,
        lineHeight: 24
    },

    view: {
        height: 99,
        width: "100%",
        borderColor: colors.bordergray,
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 9,
        paddingHorizontal: 20,
        paddingTop: 10
    },

})