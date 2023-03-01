import React, { useEffect, useState, useRef } from 'react'
import { View, StatusBar, TouchableOpacity, Image, ActivityIndicator, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { Button, CustomHeader, InputText, } from '../../../components/common'
import Loader from '../../../components/common/Loader'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors, Images } from '../../../Res'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { genOtp_forProfile, getProfile, uploadImage } from '../../../redux/actions/needs.actions'
import { showLoader, updateProfile } from '../../../redux/actions/users.actions'
import { PermissionsAndroid } from 'react-native';
import FastImage from 'react-native-fast-image'


const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.users.isRequesting)
  const [imagePickerRefVisibility, setImagePickerRefVisibility] = useState('none')
  const imagePickerRef = useRef()
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    image: '',
    pickerimg: '',
    otp: ''
  })
  const [load, setload] = useState(false)
  const [showotp, setshowotp] = useState(false)
  const [onEmail, setonEmail] = useState(false)

  const getInitialData = async () => {
    dispatch(getProfile()).then(res => {
      const user = res?.payload?.data?.user
      setSignupData({
        ...signupData,
        name: user[0]?.name,
        email: user[0]?.email,
        image: user[0]?.image,
      })
    })
  }

  useEffect(() => {
    getInitialData()
  }, [])

  const _updateProfile = () => {
    return (
      onEmail ? _withEmail() : _withoutEmail()
    )
  }
  const _withEmail = async () => {
    if (!showotp) {
      dispatch(genOtp_forProfile()).then(res => {
        setshowotp(true)
        Toast.show({
          text1: res?.payload?.data?.message,
        })
      })
      return
    }
    if (!signupData.otp) {
      Toast.show({
        type: 'error',
        text1: 'Please enter email otp.',
      })
      return
    }
    else {
      const file = {
        uri: Platform.OS === 'ios' ? `file:///${signupData?.pickerimg.uri}` : signupData?.pickerimg.uri,
        type: signupData?.pickerimg.type || '',
        name: signupData?.pickerimg.fileName || ''
      };
      const form = new FormData();
      form.append("file", file);
      dispatch(showLoader())
      if (signupData.pickerimg) {
        dispatch(uploadImage(form)).then(async (res) => {
          await dispatch(updateProfile({ ...signupData, image: res.path })).then(async res => {
            Toast.show({
              text1: res.message,
            })
          })
          navigation.goBack()
        })
      }
      else {
        dispatch(updateProfile({ ...signupData })).then(res => {
          Toast.show({
            text1: res?.message,
          })
        })
        navigation.goBack()
      }
    }
  }

  const _withoutEmail = () => {
    const file = {
      uri: Platform.OS === 'ios' ? `file:///${signupData?.pickerimg.uri}` : signupData?.pickerimg.uri,
      type: signupData?.pickerimg.type || '',
      name: signupData?.pickerimg.fileName || ''
    };
    const form = new FormData();
    form.append("file", file);
    dispatch(showLoader())
    if (signupData.pickerimg) {
      dispatch(uploadImage(form)).then(async (res) => {
        await dispatch(updateProfile({ ...signupData, image: res.path })).then(async res => {
          Toast.show({
            text1: res.message,
          })
        })
        navigation.goBack()
      })
    }
    else {
      dispatch(updateProfile({ ...signupData })).then(res => {
        Toast.show({
          text1: res?.message,
        })
      })
      navigation.goBack()
    }
  }

  const options = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: false,
    selectionLimit: 1,
    saveToPhotos: false,
    includeExtra: false,
    presentationStyle: 'pageSheet'
  }
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.log(err,);
    }
    launchCamera(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
    }).
      then(img => {
        if (!img) return
        img.assets.map((i) => {
          setSignupData({
            ...signupData,
            pickerimg: i,
          })
        })
      })
  }

  const chooseImages = () => {
    imagePickerRef.current.focus()
    setImagePickerRefVisibility('flex')
  }

  const chooseImagesFromGallery = async () => {
    launchImageLibrary(options).
      then(img => {
        if (!img) return
        img.assets.map((i) => {
          setSignupData({
            ...signupData,
            pickerimg: i,
          })
        })
      })
  }

  return (
    <>
      <StatusBar backgroundColor={colors.blue} barStyle={"light-content"} />
      <SafeAreaView style={styles.container} edges={['top']}>
        <Loader isLoading={isLoading} />
        <View style={styles.wrapper}>
          <CustomHeader text={'Profile'} back />
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.form}
            extraScrollHeight={30}
            extraHeight={30}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                alignSelf: 'center',
                borderRadius: 50,
                marginBottom: 30,
                width: 100,
                height: 100,
                borderWidth: 0.3,
                borderColor: '#999899',
                backgroundColor: load ? colors.borderlightgray : null
              }}>
              {signupData?.pickerimg || signupData?.image ? (
                <>
                  <FastImage
                    source={{ uri: signupData?.pickerimg?.uri || signupData?.image }}
                    style={{ width: 100, height: 100, borderRadius: 50, }}
                    onLoadStart={() => setload(true)}
                    onLoadEnd={() => setload(false)}
                  />
                  <ActivityIndicator size={30}
                    color={colors.white}
                    style={{ position: "absolute", bottom: 0, top: 0, right: 0, left: 0 }}
                    animating={load} />
                </>
              ) : (
                <Image
                  source={Images.dummyprofile}
                  borderRadius={50}
                  style={{ width: 100, height: 100, }} />
              )}
              <TouchableOpacity activeOpacity={0.7} onPress={chooseImages} style={styles.camera}>
                <Ionicons name='md-add-circle-sharp'
                  size={35}
                  color={colors.blue}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <InputText
              inputstying={[styles.input]}
              value={signupData.name}
              onChangeText={text => {
                setSignupData({
                  ...signupData,
                  name: text,
                })
              }}
              placeholder={'Full Name'}
              placeholderTextColor={colors.textlightgray}
            />
            <InputText
              inputstying={[styles.input]}
              value={signupData.email}
              onChangeText={text => {
                setSignupData({
                  ...signupData,
                  email: text,
                })
              }}
              placeholder={'Email'}
              placeholderTextColor={colors.textlightgray}
              onChange={() => setonEmail(true)}
            />
            {showotp ?
              <InputText placeholder={"Enter OTP"} placeholderTextColor={colors.gray}
                keyboardType={"number-pad"}
                onChangeText={(t) => setSignupData({ ...signupData, otp: t })}
              /> : null}
            <Button
              onPress={_updateProfile}
              text={'Update Profile'}
              styling={{ marginTop: 10 }}
            />
          </KeyboardAwareScrollView>
          <Picker
            ref={imagePickerRef}
            style={{ display: imagePickerRefVisibility }}
            selectedValue={''}
            onValueChange={(itemValue, itemIndex) => {
              if (!itemValue) return
              console.log('itemValue', itemValue)
              if (itemValue == 'camera') {
                openCamera()
              } else {
                chooseImagesFromGallery()
              }
              setTimeout(() => {
                setImagePickerRefVisibility('none')
              }, 200);
            }}>
            <Picker.Item label="Choose Option" value="" />
            <Picker.Item label="Camera" value="camera" />
            <Picker.Item label="Gallery" value="gallery" />
          </Picker>
        </View>
      </SafeAreaView>
    </>
  )
}

export default MyProfile
