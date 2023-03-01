'use strict';

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View, Image, ScrollView,
} from 'react-native';
import { colors, Images } from "../../Res";
import Loader from "../../components/common/Loader";
import { Button, CustomHeader, InputText } from "../../components/common";
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux'
import { gen2FA, upDate2FA } from "../../redux/actions/needs.actions";
import QRCode from 'react-native-qrcode-svg';


const Scanner = ({ navigation }) => {
  const isLoading = useSelector(state => state.users.isRequesting)
  const dispatch = useDispatch()
  const [Qr, setQr] = useState('')
  const [pin, setpin] = useState()

  const getInitialData = async () => {
    dispatch(gen2FA({ is2FAEnabled: 1 })).then(res => {
      setQr(res?.secret)
    })
  }

  useEffect(() => {
    getInitialData()
  }, [])

  const _update2FA = () => {
    console.log(Qr.base32, pin)
    if (!pin) {
      Toast.show({
        type: 'error',
        text1: 'Please enter code.',
      })
      return
    }
    dispatch(upDate2FA(
      {
        is2FAEnabled: 1,
        base32: Qr.base32,
        twoFactorSecret: pin
      })).then(res => {
        Toast.show({
          text1: res?.message,
        })
      })
    navigation.goBack()
  }

  const copyToClipboard = async () => {
    Clipboard.setString(Qr.base32);
    Toast.show({
      text1: 'Copied..',
    })
  };


  return (
    <>
      <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
      <SafeAreaView style={styles.container} edges={['top']}>
        <Loader isLoading={isLoading} />
        <CustomHeader text={'Enable 2FA'} back />
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={[styles.container, { backgroundColor: colors.white }]}>
            <View style={styles.img}>
              <QRCode
                value={Qr.otpauth_url || '0'}
                size={190}
              />
            </View>
            <View style={styles.copy}>
              <Text style={styles.text3}>{Qr.base32}</Text>
              <TouchableOpacity onPress={copyToClipboard} >
                <Ionicons
                  name="md-copy-outline"
                  size={25}
                  color={colors.black} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
              <InputText placeholder={"Enter Code"} keyboardType="number-pad"
              placeholderTextColor={colors.textlightgray}
                onChangeText={(t) => setpin(t)}
              />
              <Button
                text={"Continue"}
                styling={{ marginTop: 20 }}
                onPress={_update2FA}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

    </>
  );
}

export default Scanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center', paddingVertical: 30
  },
  copy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderWidth: 1, borderColor: colors.bordergray,
    justifyContent: "space-between"
  },
  input: {
    borderWidth: 1,
    paddingVertical: 15,

  },
  text3: {
    fontSize: 15,
    flex: 1,
    paddingEnd: 15,
    color:colors.black

  }
});


