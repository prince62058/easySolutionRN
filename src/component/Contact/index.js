import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
const { height, width } = Dimensions.get("window")
import React from 'react'
import { COLORS, FONTS, icons, images } from '../../constants'
import Icons from '../Icons'

const Contact = ({ image, text, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.box1} activeOpacity={0.5} onPress={onPress}>
            {image && <Image style={styles.icons} source={image} />}
            {icon && <View style={styles.iconBox}>
                <Icons name={icon} size={width * .06} color={COLORS.black} />
            </View>}
            <Text style={styles.text1}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Contact

const styles = StyleSheet.create({
    iconsContainer: {
        width: width * .12,
        height: height * .06,
        justifyContent: 'center',
        alignItems: 'center',
        margin: width * 0.04,
        marginTop: width * 0.043,
    },
    icons: {
        width: width * .12,
        height: width * .12,
        resizeMode: 'contain',
        marginHorizontal: width * .03,
    },
    iconBox: {
        width: width * .12,
        height: width * .12,
        marginHorizontal: width * .03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width * .12,
        backgroundColor: COLORS.prime1,
    },
    box1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: width * 0.02,
        gap: 5,
        height: height * 0.09,
        width: width * 0.91,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gray20,
        alignSelf: 'center'
    },
    text1: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        textAlign: 'center',
        color: COLORS.black,

    },
})