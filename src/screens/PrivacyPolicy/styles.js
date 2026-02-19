import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex:1,
    },
    box1: {
        marginHorizontal: width * 0.04,
        // marginBottom: -width * 0.03,
    },
    text1: {
        fontSize: 15.5,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: width * 0.01,
    },
    text2: {
        fontSize: 11.5,
        fontFamily: FONTS.light,
        color: COLORS.black,
        marginBottom: width * 0.03,
        width: width * 0.89,

    }

})