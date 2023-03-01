import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Modal, Share } from 'react-native';
import { Fonts } from '../Res';
import { colors } from '../Res/Colors';
import { Images } from '../Res/Images';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';



export const QRModal = ({ setModalVisible, Visible, walletaddress, SelectedWallet }) => {
    const navigation = useNavigation();

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: SelectedWallet || walletaddress[0]?.address,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // console.log(result.activityType)
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {

                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(SelectedWallet || walletaddress[0]?.address || '0');
        Toast.show({
            text1: 'Copied..',
        })
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={Visible}
                animationType="fade"
                onRequestClose={() => {
                    setModalVisible(!Visible);
                }}
            >
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'rgba(1,1,1,0.7)',
                    paddingHorizontal: 20
                }}>
                    <View style={styles.view}>
                        <View style={styles.sentview}>
                            <View style={{ flex: 1, alignItems: "center", }}>
                                <Text style={styles.Text}>Wallet Address</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image
                                    source={Images.close}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                            <QRCode
                                value={SelectedWallet || walletaddress[0]?.address}
                                size={170}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 11,
                            borderTopWidth: 1, borderTopColor: colors.bordergray,
                            justifyContent: "space-between"
                        }}>
                            <Text style={styles.text3}>{SelectedWallet || walletaddress[0]?.address}</Text>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Image
                                    source={Images.copy}
                                    style={{ tintColor: colors.extradarkgray }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingVertical: 12,
                            borderTopWidth: 1, borderTopColor: colors.bordergray,
                            alignItems: "center"
                        }}>
                            <TouchableOpacity style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }} onPress={onShare}>
                                <Image
                                    source={Images.share}
                                />
                                <Text style={styles.text4}>Share this</Text>
                            </TouchableOpacity>
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
    sentview: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomColor: colors.bordergray,
        borderBottomWidth: 1,
        paddingStart: 14,
        paddingEnd: 9,

    },
    text3: {
        color: colors.black,
        fontSize: 13,
        fontFamily: Fonts.SourceSansProSemiBold

    },

    text4: {
        color: colors.blue,
        marginLeft: 9,
        fontSize: 15,
        fontFamily: Fonts.SourceSansProSemiBold
    },
    Text: {
        color: colors.black,
        fontSize: 15,
        fontFamily: Fonts.SourceSansProSemiBold
    },
})