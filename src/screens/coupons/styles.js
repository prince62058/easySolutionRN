import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
   
    couponBox:{
        marginHorizontal: width * .03,
        marginVertical: height * .02,
    },

    // alert
    alert:{
        width: width * .94,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#C8C8C8',
        borderRadius:7,
        paddingVertical: height * .01,
        paddingHorizontal: width * .02,
        marginBottom: height * .015,
        alignItems:'center',
        // elevation:1,
        backgroundColor: COLORS.white,
        alignSelf:'center',
    },
    alertImage:{
        width: width * .14,
        height: width * .14,
        borderRadius: 50,
        borderWidth:1,
        borderColor:'#C8C8C8',
        // backgroundColor: '#848484',
        marginRight: width * .03,
    },
    alertTitle:{ 
        fontFamily: FONTS.semiBold,
        fontSize: 14,
        color: '#353638',
        marginBottom: -2,
    },
    alertContent:{
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: '#353638',
        marginBottom: -4,
    },
  
})