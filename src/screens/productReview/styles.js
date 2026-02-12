import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, SIZES} from './../../constants/index';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .04,
    color: COLORS.darkGray1,
    marginBottom: -4,
    marginLeft: SIZES.width * .04,
    // textDecorationLine: 'underline',
  },

  // ============= rating box ===========
  rating_row: {
    width: SIZES.width * .92,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent: 'space-between',
    marginVertical: SIZES.height * .01,
    // borderWidth: 1,
  },
  left_box: {
    width: SIZES.width * .44,
    borderColor: COLORS.lightgray,
    borderRightWidth: 1,
    alignItems: 'center',
    paddingVertical: SIZES.height * .01,
  },
  right_box: {
    width: SIZES.width * .45,
    paddingVertical: SIZES.height * .01,
    marginLeft: SIZES.width * .02,
  },
  rating_title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .038,
    color: COLORS.lightgray,
    // marginBottom: -4,
  },
  rating_text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .034,
    color: COLORS.lightgray,
    marginTop: 2,
    textAlign: 'center',
  },

  // ========= rating progress ============
  progress_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.width * .02,
  },
  star_text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .03,
    color: COLORS.black,
    marginBottom: -4,
    marginRight: 1,
  },
  star_user: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .03,
    color: COLORS.transparentBlack2,
    marginBottom: -4,
    marginLeft: SIZES.width * .02,
  },

});
