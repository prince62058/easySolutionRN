import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';

const InputText = ({
  placeholder,
  alive,
  search,
  depth,
  onPressIn,
  maxLength,
  keyboardType,
  label,
  onChangeText,
  value,
  editable,
  error,
  onBlur,
}) => {
  return (
    <View style={{alignSelf: 'center',}}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.box1, error && { marginBottom: SIZES.height * .003 }]}>
        <TextInput
          placeholder={placeholder}
          style={styles.placeholder}
          onPressIn={onPressIn}
          maxLength={maxLength}
          editable={editable}
          keyboardType={keyboardType}
          placeholderTextColor={COLORS.gray30}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
export default InputText;

const styles = StyleSheet.create({
  box1: {
    height: height * 0.065,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: SIZES.height * .015,
  },
  placeholder: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    paddingLeft: width * 0.03,
    color: COLORS.black,
    // marginBottom: -3,
    // borderWidth: 1,
    // borderColor: COLORS.border,
    // borderRadius: 8,
    // alignSelf: 'center',
    paddingBottom: SIZES.height * .006,
  },
  label: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginLeft: width * 0.015,
  },
  error: {
    color: COLORS.primary,
    fontSize: 11,
    ...FONTS.fourHundred,
    // marginLeft: width * 0.024,
    marginBottom: SIZES.height * .01,
    // marginBottom: height * 0.04,
  },
});
