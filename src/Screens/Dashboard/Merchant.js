import React, { useState } from "react";
import { Text, SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Image,StatusBar } from 'react-native';
import {  CustomHeader, } from '../../components/common';
import { Fonts } from "../../Res";
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';


const Merchant = ({ navigation }) => {

    const Data = [

        // {
        //     id: 1,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },
        // {
        //     id: 2,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },
        // {
        //     id: 3,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },
        // {
        //     id: 4,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },
        // {
        //     id: 5,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },
        // {
        //     id: 6,
        //     img: Images.capman,
        //     name: 'John doe',
        //     image: Images.arrowright,
        //     imgs: Images.scan2,
        // },

    ];
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list} >
            <View style={{ flexDirection: 'row',alignItems:"center" }}>
                <Image source={item.img}  style={{width:38,height:38}}/>
                <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row',alignItems:"center" }}>
                <Image source={item.imgs} style={styles.imgs} />
                <Image source={item.image} style={styles.icon} />

            </View>
        </TouchableOpacity>
    );
    return (
        <>
         <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.blue }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <CustomHeader text={"Merchants"} back />
                <View style={styles.containter}>
                    <View style={styles.box}>
                        <TextInput placeholder={"Search"}
                         placeholderTextColor={colors.textlightgray}
                         style={{color:colors.black}} />
                        <Image source={Images.search}
                            style={styles.img}
                        />
                    </View>
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
export default Merchant

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