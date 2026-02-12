import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS } from '../../constants';
const Button = ({ t1, t2, disabled, onPress, t3, load, smallbtn }) => {
  return (
    <TouchableOpacity activeOpacity={0.5}
      style={[
        styles.t1,
        t2,
        disabled && { backgroundColor: COLORS.gray20 },
        smallbtn && {
          width: width * 0.3,
          alignSelf: 'center',
        },
      ]}
      disabled={disabled || load}
      onPress={onPress}>
      {load && (
        <View style={styles.indBox}>
          <ActivityIndicator size={width * 0.065} color={COLORS.white} />
        </View>
      )}

      <Text style={[styles.text1, t3]}>{t1}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  load: false,
  disabled: false,
}

export default Button;
const styles = StyleSheet.create({
  t1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.prime,
    borderRadius: 10,
    height: height * 0.06,
    width: width * 0.9,
  },
  text1: {
    fontSize: width * 0.042,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    marginBottom: -4,
  },
  indBox: {
    marginLeft: width * -0.03,
    marginRight: width * 0.02
  },
});
