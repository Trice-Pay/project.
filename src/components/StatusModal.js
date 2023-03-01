import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Modal } from 'react-native';
import { Images } from '../Res/Images';
import { colors } from '../Res/Colors';
import { Fonts } from '../Res';


export const StatusModal = ({ navigation, setModalVisible, Visible, }) => {

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={Visible}
                onRequestClose={() => {
                    setModalVisible(!Visible);
                }}
            >
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'rgba(1,1,1,0.7)',
                    paddingHorizontal: 24
                }}>
                    <View style={styles.view}>
                        <View style={styles.sentview}>
                            <Text style={styles.Text}>Sent Bitcoin</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image source={Images.close} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            paddingTop: 25, paddingBottom: 20,
                        }}>
                            <Image source={Images.send2x} style={{ width: 55, height: 55 }} />
                            <Text style={styles.text}>-0.00142263 BTC</Text>
                            <Text style={styles.text2}>-$12.50</Text>
                        </View>
                        <View style={styles.last}>
                            <Text style={styles.text3}>To</Text>
                            <Text style={styles.text4}>1GLrWy2GuZi8rg7nT6dAJrW8kxJZZ6dHks</Text>
                        </View>
                        <View style={styles.last}>
                            <Text style={styles.text3}>Fee</Text>
                            <Text style={styles.text4}>0.00025263 BTC</Text>
                        </View>
                        <View style={[styles.last, { paddingBottom: 18,alignItems:"center" }]}>
                            <View style={{ flexDirection: "row",alignItems:"center" }}>
                                <Text style={styles.text4}>2/13/2021</Text>
                                <Text style={[styles.text4, { marginLeft: 9 }]}>11:54AM</Text>
                            </View>
                            <View style={styles.viewlast}>
                                <Text style={styles.text5}>Pending</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )


}

const styles = StyleSheet.create({

    view: {
        borderRadius: 10,
        backgroundColor: colors.white,
        width: "100%"
    },
    text: {
        color: colors.black,
        marginTop: 12,
        fontSize: 19,
        fontFamily:Fonts.SourceSansProSemiBold
    },
    text2: {
        color: colors.black,
        marginTop: 3,
        fontSize: 15,
        color: colors.textlightgray,
        fontFamily:Fonts.SourceSansProSemiBold

    },
    text3: {
        fontSize: 13,
        color: colors.textlightgray,
        fontFamily:Fonts.SourceSansProSemiBold

    },
    text5: {
        color:colors.white,
        fontSize:13
    },
    viewlast:{
        paddingVertical:5,
        paddingHorizontal:16,
        backgroundColor:colors.yellow,
        borderRadius:5

    },
    text4: {
        color: colors.lightblack,
        fontSize: 13,
        fontFamily:Fonts.SourceSansProSemiBold
    },
    last: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 13,
        borderTopWidth: 1,
        borderTopColor: colors.bordergray,
        paddingStart: 14, paddingEnd: 9
    },

    Text: {
        color: colors.extralightblack,
fontFamily:Fonts.SourceSansProSemiBold,
        fontSize: 15
    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
    },
    sentview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 15,
        borderBottomColor: colors.bordergray,
        borderBottomWidth: 1,
        paddingStart: 14,
        paddingEnd: 9


    }
})