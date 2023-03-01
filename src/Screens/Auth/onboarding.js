import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, ImageBackground, StatusBar, Platform } from 'react-native';
import { Button } from '../../components/common';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';
import { Images } from '../../Res/Images';


const Onboarding = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor={colors.blue} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
                <ImageBackground style={styles.containter}
                    source={Images.mainbackground}>
                    <View style={styles.top}>
                        <Image source={Images.logo} />
                    </View>
                    <View style={styles.end}>
                        <Button
                            styling={styles.btn}
                            text={"Login"}
                            textstyle={styles.btntext}
                            onPress={() => navigation.navigate('Login')} />
                        <Button
                            styling={styles.resbtn}
                            text={"Register"}
                            textstyle={styles.restext}
                            onPress={() => navigation.navigate('Register')} />
                    </View>
                </ImageBackground>
            </SafeAreaView>

        </>
    )


}
export default Onboarding

const styles = StyleSheet.create({
    containter: {
        flex: 1,
    },
    btn: {
        backgroundColor: colors.white
    },
    btntext: {
        color: colors.blue,
        fontFamily:Fonts.SourceSansProSemiBold
    },
    resbtn: {
        borderColor: colors.white,
        borderWidth: 2,
        marginTop: 21

    },
    top: {
        flex: 0.8, justifyContent: "center", alignItems: "center"
    },
    end: {
        flex: 0.2, paddingBottom: 30, paddingStart: 24, paddingEnd: 15
    },
    restext:{
    fontSize:18,
    fontFamily:Fonts.SourceSansProSemiBold
    }
})