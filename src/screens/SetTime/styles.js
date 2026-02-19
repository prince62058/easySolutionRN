import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.94,
  },
  box2: {
    flexDirection: 'row',
    width: width * 0.92,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: height * 0.065,
    borderColor: COLORS.border,
    marginTop: height * 0.02,
    borderRadius: 12,
  },
  img: {
    height: height * 0.03,
    width: width * 0.056,
    resizeMode: 'contain',
  },

  img1: {
    height: height * 0.01,
    width: width * 0.04,
    resizeMode: 'contain',
  },

  img3: {
    height: height * 0.03,
    width: width * 0.038,
    marginLeft: width * 0.012,
    resizeMode: 'stretch',
  },
  text1: {
    fontSize: 14,
    width: width * 0.8,
    marginLeft: width * 0.03,
    color: COLORS.black,
  },
  text2: {
    fontSize: 15,
    color: COLORS.black,
    margin: width * 0.02,
    marginTop: width * 0.05,
    // marginLeft: width * 0.055,
  },
  text5: {
    fontSize: 15,
    color: COLORS.black,
    marginTop: width * 0.1,
    
    marginLeft: width * 0.03,
  },
  text3: {
    fontSize: 14,
    color: COLORS.black,
    margin: width * 0.02,
    marginTop: width * 0.05,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  name: {
    height: height * 0.07,
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.002,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  modalstyle: {
    width: width * 0.94,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  modaldata: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
    height: height * 0.04,
    width: width * 0.2,
    // gap:12,
    marginBottom: width * 0.03,
    margin: width * 0.01,
  },
  text6: {
    width: width * 0.84,
    // marginLeft: -width * 0.55,
    marginBottom: width * 0.03,
    marginTop: width * 0.03,
    color: COLORS.black,
    // alignSelf: 'center',
  },
  placeholder: {
    width: width * 0.75,
    fontFamily: FONTS.regular,
    marginBottom: -3,
    fontSize: 11,
    color: COLORS.gray80,
  },
  line: {
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
  },
  box3: {
    marginTop: height * 0.05,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // position:"absolute",
    // bottom:0
  },
  btn: {
    width: width * 0.4,
    marginVertical: height * 0.02,
    alignSelf: 'center',
  },
});
