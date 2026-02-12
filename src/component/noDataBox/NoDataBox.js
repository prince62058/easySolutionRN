import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, images } from '../../constants';

const NoDataBox = ({ source, title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image
                    source={source}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.text1}>{title}</Text>
            </View>
        </View>
    )
}

NoDataBox.defaultProps = {
    source: images.not_found,
    title: "No Data"
}

export default NoDataBox;

const styles = StyleSheet.create({
    container :{
        flex: 1,
        // height: SIZES.height * .86,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        // borderWidth: 1,
    },

    box: {
        width: SIZES.width * .7,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        elevation: 10,
        borderRadius: 8,
        // borderWidth: 1,
    },

    image: {
        width: SIZES.width * .6,
        height: SIZES.height * .33,
    },

    text1:{
        width: SIZES.width * .5,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.width * .05,
        color: COLORS.black,
        marginTop: SIZES.height * -.02,
        marginBottom: SIZES.height * .02,
        flexWrap: 'wrap',
        textAlign: 'center',
    }, 
}) 