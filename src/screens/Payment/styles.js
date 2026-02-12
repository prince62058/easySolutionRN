import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  back_btn: {
    width: width * .1,
    height: width * .1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * .02,
    // borderWidth: 1,
  },
  rightarrow: {
    height: width * 0.05,
    width: width * 0.05,
    // marginTop: height * 0.02,
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },
  text1: {
    margin: width * 0.025,
    marginLeft: width * 0.03,
    fontSize: 13,
    width: width * 0.8,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
  },
  text2: {
    // margin: width * 0.032,
    marginRight: width * 0.03,
    fontSize: 13,
    color: '#EE2761',
    fontFamily: FONTS.medium,
  },

  t1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.prime,
    borderRadius: 10,
    height: height * 0.06,
    width: width * 0.4,
    marginVertical: height * 0.03,
  },
  text2: {
    fontSize: width * 0.042,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    marginBottom: -4,
  },

  btn: {
    width: width * 0.4,
    marginVertical: height * 0.03,
    alignSelf: 'center',
  },


 

  box2: {
    width: width * 0.92,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: width * 0.03,
    alignSelf: 'center',
    flexDirection: 'row',
    borderColor: '#EE2761',
    justifyContent: 'space-between',
  },
  view_btn: {
    // width: width * 0.92,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
    // justifyContent: 'space-between',
  },
  // ======================

  pymtname: {
    fontSize: 14,
    color: COLORS.black,
    ...FONTS.fiveHundred,
    width: width * 0.6,
    marginBottom: -2,
  },
  pymentBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    elevation: 3,
    backgroundColor: COLORS.white,
    height: height * 0.08,
    width: width * 0.92,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: height * 0.01,
  },
  pymtIcon: {
    height: height * 0.05,
    width: width * 0.12,
    resizeMode: 'contain',
    marginHorizontal: width * 0.03,
  },
  radioBox: {
    height: width * 0.055,
    width: width * 0.055,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: width * 0.038,
    width: width * 0.038,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
 
});
