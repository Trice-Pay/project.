
import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Button } from "../../components/common";
import { CustomHeader } from "../../components/common/Header";
import { TokenList } from "../../components/TokenList";
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import { Images } from "../../Res/Images";


const AddToken = ({ navigation }) => {
    const Data = [

        {
            id: 1,
            coin: 'Bitcoin',
            quantity: '0.5 BTC',
            image: Images.BTC,
        },
        {
            id: 2,
            coin: 'Etherium',
            quantity: '0.23 ETH',
            image: Images.eth,
        },
        {
            id: 3,
            coin: 'Tether',
            quantity: '0.5 USD',
            image: Images.tether,
        },
        {
            id: 4,
            coin: 'BNB',
            quantity: '0.23 BNB',
            image: Images.eth,
        },
    ];

    return (
        <>
            <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <CustomHeader
                        back
                        text={"Add Token"} />
                    <FlatList
                        data={Data}
                        renderItem={({ item }) => <TokenList item={item} />}
                        keyExtractor={item => item.id}
                    />
                    <View style={{ paddingHorizontal: 20, paddingBottom: 33, }}>
                        <Button
                            onPress={() => navigation.navigate('CustomToken')}
                            text={'Add Custom Token'}
                            styling={styles.btn}
                            textstyle={styles.btntext}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
export default AddToken

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
    }

})