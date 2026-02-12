import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
container:{
    flex: 1,
    backgroundColor:COLORS.white,
},
right_btn: {
    marginRight: SIZES.width * .03,
},
seen: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .04,
    textDecorationLine: 'underline',
    color: COLORS.black,
    marginBottom: -5,
},

// notification
alert_box: {
    width: SIZES.width * .94,
    // borderWidth: 1,
    borderRadius: SIZES.width * .016,
    // borderColor: COLORS.gray30,
    backgroundColor: COLORS.lightGray10,
    paddingHorizontal: SIZES.width * .023,
    marginBottom: SIZES.height * .015,
    alignSelf: 'center',
    paddingTop: SIZES.height * .01,
},
row: {
    flexDirection: 'row',
    // alignItems: 'center',
},
image: {
    width: SIZES.width * .09,
    height: SIZES.width * .09,
    marginRight: SIZES.width * .03,
    resizeMode: 'contain',
    // borderWidth: 1,
    tintColor: COLORS.primary,
    borderColor: COLORS.gray20,
    borderRadius: width * 0.2,
},
title: {
    width: SIZES.width * .67,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.width * .04,
    color: COLORS.black,
    // marginBottom: -5,
    // borderWidth: 1,
},
text: {
    width: SIZES.width * .67,
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .024,
    lineHeight: SIZES.width * .028,
    color: COLORS.black,
    marginBottom: -4,
},
date: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .026,
    color: COLORS.gray30,
    // marginBottom: -2,
    textAlign: 'right'
},

})