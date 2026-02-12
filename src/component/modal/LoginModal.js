import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, images } from '../../constants'
import Modal from 'react-native-modal'

const LoginModal = ({ visible, onPress }) => {
    return (
        <Modal
            isVisible={visible}
            animationIn={'slideInUp'}
            backdropOpacity={0.5}>
            <View style={styles.box}>
                <Image source={images.login} style={styles.image} resizeMode="contain" />
                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={onPress}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}
LoginModal.defaultProps = {
    onPress: null,
    visible: false,
}

export default LoginModal

const styles = StyleSheet.create({
    box: {
        width: SIZES.width * .7,
        // height: height * .4,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        alignSelf: 'center',
        // elevation: 10,
        borderRadius: 8,
    },
    image: {
        width: SIZES.width * .6,
        height: SIZES.height * .3,
    },
    btn: {
        backgroundColor: COLORS.primary,
        width: SIZES.width * .5,
        height: SIZES.height * .05,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZES.height * .03,
    },
    btnText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .038,
        color: COLORS.white,
        marginBottom: -3,
    },

})