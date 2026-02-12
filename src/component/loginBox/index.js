import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const LoginBox = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={images.login} style={styles.image} resizeMode="contain" />
                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginBox;

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: SIZES.width,
        height: SIZES.height * .85,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: COLORS.white,
    },
    box: {
        width: SIZES.width * .7,
        // height: height * .4,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        elevation: 10,
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
    },
    text: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.black,
    },
})