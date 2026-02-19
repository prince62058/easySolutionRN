import { StyleSheet, Text, View, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window")
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { COLORS, FONTS } from '../../constants'

const Otpview = () => {
    return (
        <View>
            <OTPInputView
                style={styles.otpCheck}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    console.log(`Code is ${code}, you are good to go!`)
                })}
            />
        </View>
    )
}

export default Otpview

const styles = StyleSheet.create({
    otpCheck: {
        width: width * 0.7,
        height: height * 0.14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    borderStyleHighLighted: {
        borderColor: COLORS.black,
    },

    underlineStyleBase: {
        width: width * 0.125,
        height: height * 0.066,
        borderWidth: 1,
        borderRadius: 8,
        color: COLORS.black,
        fontFamily: FONTS.medium,

    },
    underlineStyleHighLighted: {
        borderColor: COLORS.primary,
    },
});