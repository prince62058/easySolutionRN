import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },

    switchrow: {
      width: width * 0.92,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      // borderWidth: 1,
      justifyContent: 'space-between',
    },
      switchbox: {
        width: width * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.056,
        borderWidth: 1,
        borderColor: COLORS.gray40,
        // backgroundColor: COLORS.gray20,
        borderRadius: 10,
        marginVertical: 1,
      },
      switchtext: {
        fontSize: 14,
        ...FONTS.sixHundred,
        color: COLORS.gray40,
        marginBottom: -4,
      },

      // modal
      text4: {
        marginLeft: width * 0.02,
        width: width * 0.95,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        fontSize: 12,
        marginTop: height * 0.02,
        textAlign: 'center',
      },
      btn: {
        width: width * 0.44,
      },
      modalcanclebtn: {
        marginBottom: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: width * 0.4,
        marginRight: width * 0.03,
        // marginRight:51
      },
      cancel_modalstyle: {
        width: width,
        height: height * 0.4,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: width * 0.06,
        borderTopRightRadius: width * 0.06,
        marginTop: height * 0.6,
        alignSelf: 'center',
        // marginLeft: width * -.05,
        // zIndex: 99,
      },

      modalstyle: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: height * 0.6,
        width: width,
        height: height * 0.4,
        alignSelf: 'center',
      },
      img1: {
        height: height * 0.1,
        width: width * 0.25,
        marginLeft: width * 0.005,
      },
      img2: {
        height: height * 0.03,
        width: width * 0.06,
        marginTop: height * 0.005,
        marginLeft: width * 0.005,
      },
      text5: {
        fontSize: 15,
        fontFamily: FONTS.semiBold,
        width: width * 0.65,
        textAlign: 'center',
        color: COLORS.green1,
      },
      text6: {
        fontSize: 14,
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
        color: COLORS.primary,
      },
      line: {
        width: width * 0.9,
        marginTop: width * 0.04,
        borderTopWidth: 1,
        borderColor: COLORS.gray,
      },
      modal_box2: {
        flexDirection: 'row',
        marginTop: height * 0.02,
      },
    
   
})