import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  img: {
    height: width * 0.34,
    width: width * 0.34,
    borderRadius: 90,
    resizeMode: 'contain',
  },
  imgpicker: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.13,
    marginLeft: width * 0.27,
  },
  imgpickerbox: {
    marginTop: height * 0.015,
    marginVertical: height * 0.005,
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    marginBottom: -5,
  },
  text2: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 10,
  },
  line: {
    width: width,
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
    marginVertical: height * 0.02,
  },
  box2: {
    alignItems: 'center',
    height: height * 0.26,
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
  },

  text5: {
    fontSize: 20,
    color: '#EE2761',
    marginTop: width * 0.028,
    fontFamily: FONTS.medium,
  },
  text3: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginBottom: -2,
  },
  text6: {
    color: COLORS.black,
    textAlign: 'center',
    marginTop: width * 0.028,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  text4: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: width * 0.029,
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
  text7: {
    borderWidth: 2,
    borderColor: '#EE2761',
    width: width * 0.36,
    height: height * 0.065,
    borderRadius: 50,
    marginTop: height * 0.032,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text8: {
    backgroundColor: '#EE2761',
    width: width * 0.36,
    height: height * 0.065,
    borderRadius: 50,
    marginTop: height * 0.03,
  },
  text9: {
    borderWidth: 1,
    width: width * 0.84,
    height: height * 0.0001,
    borderColor: COLORS.lightGray31,
    marginTop: width * 0.02,
  },
  resizeimg: {
    height: height * 0.028,
    width: width * 0.05,
    resizeMode: 'contain',
  },
});
