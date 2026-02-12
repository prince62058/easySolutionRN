import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'

const Badge = ({ count, style }) => {
    return (
        <>
            {count > 0 &&
                <View style={[styles.badge, style]}>
                    <Text style={styles.count}>{count}</Text>
                </View>
            }
        </>
    )
}
Badge.defaultProps = {
    count: 0,
    style: null
}

export default Badge

const styles = StyleSheet.create({
    badge: {
        backgroundColor: COLORS.red,
        position: 'absolute',
        width: SIZES.width * .05,
        height: SIZES.width * .05,
        top: 0,
        right: -5,
        borderRadius: SIZES.width * .05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .024,
        color: COLORS.white,
        marginBottom: -2,
    },
})