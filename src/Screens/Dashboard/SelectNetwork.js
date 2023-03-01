import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Image,StatusBar } from 'react-native';
import {  CustomHeader, } from '../../components/common';
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const SelectNetwork = ({ navigation }) => {

    const Data = [

        {
            id: 1,
            rpcUrl:'https://mainnet.infura.io/v3/178f8555af4044009f5be24c8136345e',
            chainId:'1',
            symbol:'ETH',
            url:'https://etherscan.io',
            name: 'ETH',
         
        },
        {
            id: 2,
            rpcUrl:'https://rpc-mainnet.maticvigil.com/v1/20f15278a96284b49a7c487e414de7419515d496',
            chainId:'137',
            symbol:'MATIC',
            url:'https://polygonscan.com/',
            name: 'POLYGON',
        },
        
      

    ];
    const updateRpcData=async(rpcUrl,chainId,symbol,url)=>{
        var rpcData={rpcUrl,
        chainId,symbol,url}
        await AsyncStorage.setItem('trice_rpc_data',JSON.stringify( rpcData));
        Toast.show({
            type: 'success',
            text1: 'Network Changed!',
          })
       

    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list} onPress={()=>updateRpcData(item.rpcUrl,item.chainId,item.symbol,item.url)} >
            <View style={{ flexDirection: 'row',alignItems:"center" }}>
                
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row',alignItems:"center" }}>
               
            </View>
        </TouchableOpacity>
    );
    return (
        <>
         <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Networks"} back />
                <View style={styles.containter}>
                   
                    <View>
                        <FlatList
                            data={Data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ marginTop: 26 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )


}
export default SelectNetwork

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    box: {
        height: 40,
        width: "100%",
        backgroundColor: colors.lightgrayback,
        marginTop: 26,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        borderRadius: 30
    },
    img: {
        height: 16,
        width: 16
    },
    text: {
        fontSize: 16,
        marginLeft: 12,
fontFamily:Fonts.SourceSansProSemiBold,
        color: colors.black
    },
    imgs: {
        marginRight: 18
    },
    icon: {
       tintColor:colors.blue
    },
    list: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.borderlightgray,
        justifyContent: "space-between",
        paddingVertical: 13,
        paddingHorizontal: 15,
    }
})