import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import Button from '../Button'
import Modal from 'react-native-modal';
import { COLORS, FONTS, icons } from '../../constants';
const { width, height } = Dimensions.get('window')


const PaymentSuccessModal = ({ orderId, visible, onchangeVisible }) => {
    return (
        <View>
            {/* payment done modal */}
            <Modal isVisible={visible}>
                <View style={styles.modalstyle1}>
                    <View>
                        <Text style={[styles.text16, { fontSize: 12, width: width }]}>
                            Order Number : {orderId}
                        </Text>
                        <Text style={styles.line1}></Text>
                    </View>
                    <Image source={icons.giftconfirm} style={styles.img11} />
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Image source={icons.checkconfirm} style={styles.img12} />
                        <Text style={styles.text15}>
                            Thank You, Your Order Has Been Placed.
                        </Text>
                    </View>
                    <Text style={styles.text16}>
                        An email confirmation has been sent to you.
                    </Text>

                    <Button
                        t1={'Continue'}
                        t2={[styles.btn1, { marginLeft: width * 0.04, marginBottom: 12 }]}
                        onPress={onchangeVisible}
                        // onPress={() => navigation?.navigate("Booking")}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default PaymentSuccessModal

const styles = StyleSheet.create({
    // payment modal 
    modalstyle1: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    line1: {
        width: width * 0.9,
        marginTop: width * 0.04,
        borderTopWidth: 1,
        borderColor: COLORS.gray,
        alignSelf: 'center',
    },
    img11: {
        height: height * 0.1,
        width: width * 0.25,
        resizeMode: 'contain',
    },
    img12: {
        height: height * 0.03,
        width: width * 0.06,
        resizeMode: 'contain',
    },
    text15: {
        fontSize: 14,
        fontFamily: FONTS.semiBold,
        width: width * 0.65,
        textAlign: 'center',
        color: COLORS.green1,
    },
    text16: {
        fontSize: 11,
        fontFamily: FONTS.regular,
        width: width * 0.75,
        textAlign: 'center',
        color: COLORS.gray30,
        marginTop: height * 0.015,
    },

    box12: {
        width: width * 0.9,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: width * 0.03,
        alignSelf: 'center',
        flexDirection: 'row',
        borderColor: '#EE2761',
    },
    btn1: {
        width: width * 0.4,
        marginVertical: height * 0.03,
        alignSelf: 'center',
    },
})