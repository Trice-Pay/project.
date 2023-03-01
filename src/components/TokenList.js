import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    Switch
} from 'react-native';
import { Fonts } from '../Res';
import { colors } from '../Res/Colors';

export const TokenList = ({ item }) => {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    return (
        <TouchableOpacity style={styles.list} >
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Image source={item.image} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.cointext}>
                        {item.coin}
                    </Text>
                    <Text style={styles.quantitytext}> {item.quantity}
                    </Text>
                </View>
            </View>
            <View>
                <Switch
                    trackColor={{ false: colors.switchcolor, true: "#1897D6" }}
                    thumbColor={isEnabled ? colors.white : "#FBFCFC"}
                    ios_backgroundColor={colors.switchcolor}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    list: {
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderBottomColor: colors.bordergray,
        justifyContent: "space-between",
        paddingVertical: 17,
        paddingHorizontal: 20,
    },
    cointext: {
        color: colors.black,
        fontSize: 18,
fontFamily:Fonts.SourceSansProSemiBold
    },
    quantitytext: {
        color: colors.textlightgray,
        fontSize: 13,
        marginTop: 4,
        fontFamily:Fonts.SourceSansProRegular
    },

})
