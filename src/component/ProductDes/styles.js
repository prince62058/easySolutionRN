import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  text2: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    marginBottom: width * 0.03,
    marginTop: width * 0.015,
    color: COLORS.gray60,
  },
  contain: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray70,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  box5: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75,
    borderRadius: 5,
    elevation: 1,
    backgroundColor: COLORS.white,
    width: width,
  },
  box6: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: height * 0.08,
  },

  box20: {
    flexDirection: 'row',
    marginTop: width * 0.03,
    // marginLeft: width * 0.01,
  },
  box18: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  t3: {
    elevation: 1,
    height: height * 0.055,
    // padding: 8,
    marginVertical: width * 0.025,
    borderRadius: 10,
   
    width: width * 0.35,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },

  border: {
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
    marginVertical: height * 0.015,
  },
  // addbtn: {
  //   width: width * 0.35,
  //   borderRadius: 30,
  //   backgroundColor: COLORS.white,
  //   borderWidth: 1,
  //   borderColor: COLORS.prime,
  // },
  // buybtn: {
  //   width: width * 0.35,
  //   borderRadius: 30,
  // },

  img5: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  text22: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  text23: {
    fontSize: 11,
    textDecorationLine: 'line-through',
    fontFamily: FONTS.regular,
    color: COLORS.gray60,
    paddingBottom: -5,
    width: width * 0.14,
    textAlign: 'center',
  },
  text24: {
    fontSize: 10,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  switchtext: {textAlign: 'center', color: COLORS.black, fontSize: 13},

  img7: {
    height: height * 0.013,
    width: width * 0.03,
    resizeMode: 'contain',
    // marginLeft: width * 0.045,
    marginTop: height * 0.005,
  },
});
