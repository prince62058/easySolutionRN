import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'
import Icons from '../Icons'



const Input1 = ({
    placeholder,
    onChangeText,
    value,
    inputTextStyle,
    keyboardType,
    maxLength,
    editable,
    multiline,
    numberOfLines,
    inputStyle,
    onFocus,
    onBlur,
    label,
    autoCapitalize,
    autoComplete,
    autoCompleteType,
    inputType,
    error }) => {
    const [secure, setSecure] = useState(true)
    // console.log("error : ", error)

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            {inputType == 'password' ?
                <View style={[styles.input_box1, inputStyle, error && { marginBottom: SIZES.height * .003 }]}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={COLORS.gray30}
                        onChangeText={onChangeText}
                        value={value}
                        style={[styles.inputTextStyle1, inputTextStyle]}
                        editable={editable}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        secureTextEntry={secure}
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => setSecure(!secure)} >
                        <Icons name={secure ? "eye-off" : "eye"} size={SIZES.width * .06} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                :
                <View style={[styles.input_box, inputStyle, error && { marginBottom: SIZES.height * .003 }]}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={COLORS.gray30}
                        onChangeText={onChangeText}
                        value={value}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        style={[styles.inputTextStyle, inputTextStyle, multiline && { textAlignVertical: 'top' }]}
                        editable={editable}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        autoCompleteType={autoCompleteType}
                        autoComplete={autoComplete}
                        autoCapitalize={autoCapitalize}
                    />
                    {multiline &&
                        <View style={styles.line_box}>
                            <View style={{ ...styles.line, width: SIZES.width * .01 }} />
                            <View style={{ ...styles.line, width: SIZES.width * .03 }} />
                            <View style={{ ...styles.line, width: SIZES.width * .05 }} />
                        </View>
                    }
                </View>
            }
            {error && <Text style={[styles.error, inputTextStyle?.width && { width: inputTextStyle?.width }]}>{error}</Text>}
        </View>
    )
}

Input1.defaultProps = {
    inputTextStyle: null,
    onChangeText: null,
    placeholder: null,
    value: null,
    keyboardType: "default",
    maxLength: null,
    inputStyle: null,
    editable: true,
    multiline: false,
    numberOfLines: null,
    error: null,
    onBlur: null,
    onFocus: null,
    label: null,
    autoCapitalize: 'none',
    autoComplete: 'off',
    autoCompleteType: 'email',
    inputType: 'text',
}

export default Input1;

const styles = StyleSheet.create({
    input_box: {
        alignSelf: 'center',
        marginBottom: SIZES.height * .02,
    },
    inputTextStyle: {
        width: SIZES.width * .94,
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .041,
        color: COLORS.black,
        backgroundColor: COLORS.white,
        borderWidth: 1.3,
        borderRadius: SIZES.width * .024,
        borderColor: COLORS.gray20,
        paddingBottom: SIZES.height * .01,
        paddingLeft: SIZES.width * .04,
    },
    input_box1: {
        width: SIZES.width * .94,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderWidth: 1.3,
        borderRadius: SIZES.width * .024,
        borderColor: COLORS.primary,
        marginBottom: SIZES.height * .02,
    },
    inputTextStyle1: {
        width: SIZES.width * .8,
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .041,
        color: COLORS.primary,
        backgroundColor: COLORS.white,
        // borderWidth: 1,
        paddingBottom: SIZES.height * .01,
        paddingLeft: SIZES.width * .04,
    },


    error: {
        width: SIZES.width * .94,
        alignSelf: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .032,
        color: "red",
        // marginBottom: -4,
        marginBottom: SIZES.height * .01,
    },
    line: {
        borderBottomWidth: 1.3,
        borderColor: COLORS.gray20,
        marginBottom: 4,
    },
    line_box: {
        width: SIZES.width * .1,
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        bottom: SIZES.height * .01,
        transform: [{ skewY: '-45deg' }],
    },
    label: {
        // borderWidth: 1,
        fontFamily: FONTS.semiBold,
        // fontSize: 15,
        fontSize: SIZES.width * .045,
        color: COLORS.primary,
    },
    btn: {
        width: SIZES.width * .14,
        height: SIZES.width * .12,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
    },
})