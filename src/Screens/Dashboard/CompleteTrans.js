import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity,StatusBar } from 'react-native';
import { CustomHeader } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';


const CompleteTrans = ({ navigation,route }) => {
    const { tokenBalance} = route?.params || {}
    console.log("tokkkkk-->",tokenBalance)

    return (
        <>
         <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader press text={"Transaction Sent"} />
                <View style={styles.containter}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Image source={Images.check} />
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <Text style={styles.text}>
                            Your transaction is on the way!
                        </Text>
                        {/* <Text style={styles.text2}>
                            You sent 0.00117 ETH ($10.00) to an external address</Text> */}
                        <TouchableOpacity style={styles.view}
                            onPress={() => navigation.navigate('BitcoinDetail',{tokenBalance:tokenBalance})}>
                            <Text style={styles.text3}>View Details</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </>
    )


}
export default CompleteTrans

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 35,
        alignItems: "center"
    },
    view: {
        height: 52,
        width: 211,
        borderColor: colors.blue,
        borderWidth: 2,
        borderRadius: 6,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: colors.black,
        fontSize: 19,
fontFamily:Fonts.SourceSansProBold,
        textAlign: 'center',
        marginTop: 29
    },
    text2: {
        color: colors.extradarkgray,
        fontSize: 17,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 23,
fontFamily:Fonts.SourceSansProSemiBold
    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
        marginTop: 20

    },
    text3: {
        color: colors.blue,
        fontSize: 16,
        textAlign: 'center',
        fontFamily:Fonts.SourceSansProBold,

    },
})