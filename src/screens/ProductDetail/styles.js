import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

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

  box5: {
    flexDirection: 'row',
    borderRadius: 10,
    width: width,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  img2: {
    height: height * 0.28,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  heart: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 28,
    top: 20,
  },

  box6: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.005,
    width: width * 0.1,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    width: width * 0.022,
    height: width * 0.022,
    borderRadius: 20,
  },
  text5: {
    // margin: width * 0.03,
    // fontFamily: FONTS.medium,
    // fontSize: 14,
    // marginLeft: width * 0.06,
    // color: COLORS.black,
    // marginBottom: -5,
  },
  //   img3: {
  //     height: height * 0.23,
  //     width: width * 0.9,
  //     borderRadius: 50,
  //   },
  box8: {
    backgroundColor: '#005282',
    // marginLeft: width * 0.35,
    height: height * 0.23,
    borderRadius: 15,
  },
  box2: {
    flexDirection: 'row',
    marginVertical: height * 0.008,
    // gap: 5,
  },
  text3: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginLeft: width * 0.04,
    marginBottom: -2,

    // marginBottom: height * 0.004,
  },
  img1: {
    height: height * 0.02,
    width: width * 0.038,
    marginTop: height * 0.0015,
  },
  text5: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    width: width * 0.15,
  },
  text6: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.red,
  },
  text2: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.red,
    marginTop: height * 0.03,

    // marginBottom: height * 0.004,
  },
  box1: {
    // margin: width * 0.06,
    // marginLeft: width * 0.07,
  },
  text1: {
    fontSize: 12,
    // marginLeft: width * 0.01,
    color: COLORS.green1,
    fontFamily: FONTS.medium,
    // marginVertical: height * 0.008,
  },
  text8: {
    marginTop: height * 0.02,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: height * -0.01,
  },
  box3: {
    borderWidth: 1,
    marginRight: width * 0.035,
    marginTop: height * 0.02,
    height: height * 0.063,
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  t1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: height * 0.03,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    backgroundColor: COLORS.white,
    width: width * 0.4,
    borderRadius: 8,
    alignSelf: 'center',
    height: height * 0.05,
  },
  view: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: COLORS.regular,
  },
  image: {
    height: height * 0.028,
    width: width * 0.06,
    resizeMode: 'contain',
    marginLeft: width * 0.02,
  },
  //   -------------------------------------------
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: height * 0.08,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  addbtn: {
    width: width * 0.35,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.prime,
  },
  buybtn: {
    width: width * 0.35,
    borderRadius: 30,
  },
});
