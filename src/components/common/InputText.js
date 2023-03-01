import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';
import { Fonts } from '../../Res';
import { colors } from '../../Res/Colors';

export const InputText = ({
  placeholder,
  showright,
  rightimg,
  placeholderTextColor,
  secureTextEntry,
  inputstying,
  onChangeText,
  keyboardType,
  value,
  onChange,
  editable,
  defaultValue
}) => (
  <>
    <View
      style={[styles.input, inputstying]}>
      <TextInput
        style={styles.view}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCapitalize={"none"}
        keyboardType={keyboardType}
        value={value}
        onChange={onChange}
        editable={editable}
        defaultValue={defaultValue}

      />
      {
        showright &&
        <Image source={rightimg}
        />
      }
    </View>
  </>
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 54,
    backgroundColor: colors.inputgray,
    borderRadius: 6,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    flex: 1, fontSize: 16,
    color: colors.darktextgray,
    fontFamily: Fonts.SourceSansProRegular
  }
});
