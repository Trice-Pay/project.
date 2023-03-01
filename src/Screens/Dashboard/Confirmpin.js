import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, View, StatusBar, StyleSheet, Image, Text } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import { colors } from "../../Res/Colors"
import { Images } from '../../Res/Images';
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ConfirmPin = ({ navigation, route }) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState({ pin: "", confirm: "" })
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    const { pin } = route?.params || {}

    useEffect(() => {
        if (enteredPin.pin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.pin.length === 4) {
            setShowCompletedButton(true)
        } else {
            setShowCompletedButton(false)
        }
    }, [enteredPin])

    return (
        <>
            <StatusBar backgroundColor={colors.darkblue} barStyle={"light-content"} />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: colors.darkblue, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <Image source={Images.logo}
                        style={styles.img}
                    />
                </View>
                <Text style={styles.text}>{"Confirm Pin"}
                </Text>
                <ReactNativePinView
                    inputSize={22}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={60}
                    onValueChange={value => setEnteredPin({ ...enteredPin, pin: value, })}
                    style={{ paddingHorizontal: 7 }}
                    buttonAreaStyle={{
                        marginTop: 24,
                    }}
                    inputAreaStyle={{
                        marginBottom: 24,
                    }}
                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#FFF",
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#FFF",
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#FFF",
                    }}
                    buttonTextStyle={{
                        color: "#FFF",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            if (pin != enteredPin.pin) {
                                Toast.show({
                                    type: 'error',
                                    text1: "Password confirmation doesn't match Password."
                                })
                            }
                            else {
                                AsyncStorage.setItem('Pin', enteredPin.pin)
                                Toast.show({
                                    type: 'success',
                                    text1: "Pin generate successfully",
                                })
                                navigation.dispatch(
                                    CommonActions.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: 'Dashboard',
                                          params: {
                                            type: 'register',
                                          },
                                        },
                                      ],
                                    })
                                  )
                            }
                        }
                        // if (key === "three") {
                        //   alert("You can't use 3")
                        // }
                    }}
                    customLeftButton={showRemoveButton ? <Feather name="delete" size={35} color={colors.white} /> : undefined}
                    customRightButton={showCompletedButton ? <Fontisto name="locked" size={31} color={colors.white} /> : undefined}
                />
            </SafeAreaView>
        </>
    )
}
export default ConfirmPin

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 20
    },
    img: {
        height: 60,
        width: 60

    },
    text: {
        color: colors.white,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20

    },
})