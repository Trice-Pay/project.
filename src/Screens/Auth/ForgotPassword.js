import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, StatusBar } from 'react-native';
import { ScrollView } from 'react-native';
import { Button, InputText } from '../../components/common';
import { forgotPassword } from '../../redux/actions/users.actions';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
  const isLoading = useSelector(state => state.users.isRequesting)
  const dispatch = useDispatch()
  const [user, setuser] = useState({ email: "" })

  const _forgot = () => {
    if (!user.email) {
      Toast.show({
        type: 'error',
        text1: 'Please enter email.',
      })
      return
    }
    dispatch(forgotPassword(user)).then(res => {
      if (res) {
        Toast.show({
          type: 'success',
          text1: res?.message,
        })
        navigation.navigate('ChangePassword')
      }
    })
  }

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
        <Loader isLoading={isLoading} />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.imgview}>
            <Image source={Images.art4}
              style={styles.img} />
          </View>
          <View style={styles.containter}>
            <View>
              <Text style={styles.text}>Forgot Password</Text>
              <Text style={styles.txt}>We will send the updated password link on your registered email</Text>
            </View>
            <View style={{ marginTop: 18 }}>
              <InputText placeholder={"Email Address"}
                placeholderTextColor={colors.gray}
                showright rightimg={Images.at}
                onChangeText={(t) => setuser({ ...user, email: t })}
              />
              <View style={{ marginTop: 42 }}>
                <Button onPress={_forgot}
                  styling={styles.logbtn}
                  text={"Submit"}></Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
export default ForgotPassword

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: colors.blue,
    marginTop: 90,
    fontSize: 29,
    fontFamily: Fonts.SourceSansProBold
  },
  txt: {
    color: colors.textlightgray,
    fontSize: 14,
    marginTop: 10,
    fontFamily: Fonts.SourceSansProRegular

  },
  imgview: {
    justifyContent: 'center', alignItems: 'center', marginTop: 90,
  }

})