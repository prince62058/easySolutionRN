import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.92,
  },
  righticonbox: {
    backgroundColor: '#389218',
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  righticon: {
    width: width * 0.04,
    height: width * 0.04,
    resizeMode: 'contain',
    zIndex: 1,
  },
  borderheight: {
    height: height * 0.22,
    borderRightWidth: 2,
    borderColor: '#389218',
    marginRight: width * 0.05,
    position: 'absolute',
    top: 14,
    left: 8,
  },
  row: {
    flexDirection: 'row',
  },
  trackheading: {
    color: COLORS.black,
    fontSize: 13,
    ...FONTS.fiveHundred,
  },
  tracksubheading: {
    color: COLORS.black,
    fontSize: 12,
    ...FONTS.fiveHundred,
    marginBottom: height * -0.002,
    marginTop: height * 0.01,
    width: width * 0.8,
  },
  trackgrayheading: {
    color: COLORS.gray40,
    fontSize: 12,
    ...FONTS.fiveHundred,
    width: width * 0.8,
  },
  marginleft: {
    marginLeft: width * 0.04,
  },

  track_container: {
    // flex: 1,
    height: SIZES.height * .5,
    marginLeft: SIZES.width * .04,
  },
});