import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    t1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: height * 0.065,
        width: width * 0.9,
        borderRadius: 12,
        margin: width * 0.05,
        borderColor: COLORS.primary,
    },
    text1: {
        fontSize: 14,
        fontFamily: FONTS.semiBold,
        color: COLORS.primary,

    },

})