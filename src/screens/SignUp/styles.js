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
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  margin: {
    marginVertical: height * 0.02,
  },
  text1: {
    fontSize: 28,
    ...FONTS.sixHundred,
    color: COLORS.black,
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    ...FONTS.fiveHundred,
    color: COLORS.black,
    marginBottom: height * 0.1,
  },
  along: {
    marginTop: height * 0.08,
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },

  box3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: width * 0.01,
    alignSelf: 'center',
  },
  text4: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  text5: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  error: {
    color: COLORS.primary,
    fontSize: 11,
    ...FONTS.fourHundred,
    marginLeft: width * 0.015,
  },
});
