import React,{useEffect} from 'react';
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Text,StatusBar } from 'react-native';
import { Images } from '../../Res/Images';
import { CustomHeader } from '../../components/common/Header';
import { colors } from '../../Res/Colors';
import { Fonts } from '../../Res';

import AsyncStorage from '@react-native-async-storage/async-storage'
const AddWallet = ({ navigation }) => {

    const _checkRpcData=async()=>{
        const rpcData =JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
        setShowNetwork(rpcData.symbol)
        console.log("RPC DATA",rpcData)
    }
useEffect(()=>{
_checkRpcData()
},[])
    return (
        <>
         <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#35469E' }}>
                <CustomHeader text={"Add Wallet"} back />
                <View style={styles.containter}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Images.pic}
                            style={styles.img} />
                    </View>
                    <View style={styles.last}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('GenerateWallet')}
                            style={[styles.view, { marginBottom: 21 }]}>
                            <Image source={Images.wallet3} />
                            <Text
                                style={styles.text}>Generate New Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ImportWallet')}
                            style={styles.view}>
                            <Image source={Images.error} />
                            <Text style={styles.text}>Import Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )


}
export default AddWallet

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: colors.blue
    },
    img: {
        marginTop: 53,
    },
    view: {
        height: 94,
        width: "100%",
        borderRadius: 15,
        backgroundColor: colors.white,
        flexDirection: "row",
        paddingLeft: 27,
        paddingRight: 21,
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: '#212F75',
        fontSize: 19,
        fontFamily: Fonts.SourceSansProBold

    },
    last: {
        flex: 1, justifyContent: "flex-end", paddingBottom: 44
    }
})