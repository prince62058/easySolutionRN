import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    
  homeheaderimg3: {
    height: height * 0.022,
    width: width * 0.06,
    marginLeft: width * 0.02,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },

  search_box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: height * 0.06,
    borderRadius: 8,
    width: width * 0.82,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginLeft: width * -0.05,
  },
  t1: {
    width: width * 0.74,
    fontFamily: FONTS.regular,
    fontSize: width * .04,
    color: COLORS.black,
    paddingBottom: width * .013,
    // borderWidth: 1,
  },
    box1: {
        flexDirection: 'row',
        margin: width * 0.065,
        marginTop: width * 0.03,
        justifyContent: 'space-between',
    },
    img: {
        height: height * 0.002,
        width: width,
        marginTop: -height * 0.025,
    },
    text1: {
        fontSize: 12,
        fontFamily: FONTS.regular,

    },
    text2: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.primary,
    },

    // no search
    text3: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.gray1,
        textAlign: 'center',
    },
    
    img1:{
        height: height*0.3,
        width: width*0.8,
    },
    box2:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: height*0.15,
    },
    box3:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: height*-0.1,
    },
    img2:{
        height: width*0.3,
        width: width*0.3,
        tintColor: COLORS.gray30,
    },
    text4: {
        fontSize: width*0.038,
        fontFamily: FONTS.regular,
        color: COLORS.gray1,
        textAlign: 'center',
        marginTop: height*0.01,
    },
})