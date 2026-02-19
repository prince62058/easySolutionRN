import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icons from '../Icons'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { Dropdown } from 'react-native-element-dropdown'
import { TouchableOpacity } from 'react-native'


const DropdownInput = ({
    placeholder,
    onChangeText,
    value,
    inputTextStyle,
    label,
    data,
    disable,
    labelField,
    valueField,
    inputStyle,
    onFocus,
    search,
    onPress,
    dropdownStyle,
    error }) => {

    // console.log('disable dropdown : ', disable)
    return (
        <>
            {disable ?
                <View
                    style={[styles.inputStyle, inputStyle]}
                >
                    {label && <Text style={styles.label}>{label}</Text>}
                    <TouchableOpacity activeOpacity={0.5}
                        // style={styles.row}
                        style={[styles.row, inputTextStyle, error && { marginBottom: 2 }]}
                        onPress={onPress}
                    >
                        <TextInput
                            placeholderTextColor={COLORS.gray30}
                            placeholder={placeholder}
                            editable={false}
                        />
                        <Icons name={"down-outline"} size={SIZES.width * .05} color={COLORS.lightgray} />
                    </TouchableOpacity>
                    {error && <Text style={[styles.error, inputTextStyle?.width && inputTextStyle?.width]}>{error}</Text>}
                </View>
                :
                <View
                    style={[styles.inputStyle, inputStyle]}
                >
                    {label && <Text style={styles.label}>{label}</Text>}
                    <Dropdown
                        style={[styles.inputBox, inputTextStyle, error && { marginBottom: 2 }]}
                        // placeholderStyle={[styles.placeholderStyle, error &&{color: COLORS.danger}]}
                        placeholderStyle={[styles.placeholderStyle]}
                        selectedTextStyle={[styles.dropDownTextStyle,]}
                        inputSearchStyle={styles.inputSearchStyle}
                        // iconStyle={styles.iconStyle}
                        data={data ? data : []}
                        mode='modal'
                        disable={disable}
                        showsVerticalScrollIndicator={false}
                        search={search}
                        searchPlaceholder="Search..."
                        containerStyle={[styles.containerStyle, dropdownStyle]}
                        // maxHeight={300}
                        labelField={labelField}
                        valueField={valueField}
                        itemContainerStyle={styles.itemContainerStyle}
                        itemTextStyle={styles.itemTextStyle}
                        placeholder={placeholder}
                        iconColor={COLORS.primary}
                        // value={value ? `${data?.some((ele) => ele.valueField == value)}` : null}
                        value={value}
                        onChange={onChangeText}
                        onFocus={onFocus}
                    />
                    {error && <Text style={[styles.error, inputTextStyle?.width && {width: inputTextStyle?.width}]}>{error}</Text>}
                </View>
            }
        </>

    )
}

DropdownInput.defaultProps = {
    inputTextStyle: null,
    onChangeText: null,
    placeholder: null,
    value: null,
    inputStyle: null,
    data: [],
    error: null,
    label: null,
    onFocus: null,
    disable: false,
    labelField: "label",
    valueField: 'value',
    search: true,
    dropdownStyle: null,
    onPress: null,
}

export default DropdownInput;

const styles = StyleSheet.create({

    inputStyle: {
        alignSelf: 'center',
        marginBottom: SIZES.height * .02,
    },
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.03,
        width: SIZES.width * 0.94,
        height: SIZES.height * .065,
        borderRadius: 10,
        marginVertical: SIZES.height * 0.013,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    label: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .04,
        color: COLORS.black,
        // marginBottom: -4,
    },

    inputBox: {
        width: SIZES.width * .92,
        height: SIZES.height * .065,
        backgroundColor: COLORS.white,
        borderWidth: 1.3,
        borderRadius: SIZES.width * .024,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * .03,
        // marginBottom: SIZES.height * .01,
    },

    containerStyle: {              //dropdown container
        width: SIZES.width * .7,
        height: SIZES.height * .34,
        borderRadius: SIZES.width * .023,
        // backgroundColor: COLORS.primary,
    },
    itemContainerStyle: {
        borderBottomWidth: 1,
        borderColor: COLORS.gray20,
    },

    dropDownBtnStyle: {
        width: SIZES.width * .88,
        height: SIZES.height * .06,
        backgroundColor: COLORS.white,
    },
    dropDownTextStyle: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.primary,
        marginBottom: -3,
    },
    inputSearchStyle: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.black,
        marginBottom: -3,
        borderRadius: 5,
        marginTop: SIZES.height * .01,
    },

    itemTextStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .04,
        color: COLORS.black,
        textAlign: 'center',
        // backgroundColor: COLORS.primary,
        marginVertical: SIZES.height * -.02,
        paddingVertical: SIZES.height * .01,
    },

    placeholderStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .04,
        color: COLORS.gray30,
        marginBottom: -3,
    },
    selectedTextStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .04,
        color: COLORS.black,
        // marginBottom: -4,
    },
    error: {
        width: SIZES.width * .94,
        alignSelf: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .032,
        color: "red",
        marginTop: -2,
        // marginBottom: SIZES.height * .01,
    },
})