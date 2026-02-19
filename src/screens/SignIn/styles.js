import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.92,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },

  text1: {
    fontSize: 34,
    marginTop: height * 0.1,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginBottom: -4,
    alignSelf: 'center',
  },
  text2: {
    fontSize: 12,
    width: width * 0.4,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    alignSelf: 'center',
    marginBottom: height * 0.05,
  },

  along: {
    marginVertical: height * 0.04,
    alignSelf: 'center',
  },

  guest: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.5,
    height: height * 0.055,
    marginTop: height * 0.03,
    borderColor: COLORS.primary,
    alignSelf: 'center',
  },
  text4: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 12,
    marginBottom: -3,
  },
  error: {
    color: COLORS.primary,
    fontSize: 11,
    ...FONTS.fourHundred,
    marginLeft: width * 0.015,
  },
});
