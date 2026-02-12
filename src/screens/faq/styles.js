import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  line: {
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
  },
  box1: {
    margin: width * 0.03,
  },
  text1: {
    color: COLORS.primary,
    fontSize: 15,
    fontFamily: FONTS.medium,
    marginLeft: width * 0.04,
  },
  btn: {
    height: height * 0.045,
    width: width * 0.2,
    marginLeft: width * 0.03,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  box2: {
    flexDirection: 'row',
    marginTop: width * 0.03,
  },
  text2: {
    fontSize: 11,
    color: COLORS.primary,
    fontFamily: FONTS.regular,
  },
  btn2: {
    marginTop: height * 0.03,
    marginLeft: -width * 0.001,
    borderRadius: 10,
  },
});
