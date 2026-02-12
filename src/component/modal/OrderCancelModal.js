import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import Button from '../Button'
import Modal from 'react-native-modal';
import { COLORS, FONTS, icons, images } from '../../constants';
const { width, height } = Dimensions.get('window')


const OrderCancelModal = ({ orderId, visible, onchangeVisible }) => {
    return (
        <View>
            {/* payment done modal */}
            <Modal isVisible={visible}>
                <View style={styles.modalstyle1}>
                    <Image source={images.cancel_order} style={styles.image} />
                    <Text style={styles.title}>
                            Cancel Booking
                            Successfull !
                        </Text>
                   
                    <Text style={styles.text}>
                        You have successfully canceled your
                        service booking. 80% funds will be
                        returned to your account
                    </Text>

                    <Button
                        t1={'ok'}
                        t2={styles.btn}
                        onPress={onchangeVisible}
                    // onPress={() => navigation?.navigate("Booking")}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default OrderCancelModal

const styles = StyleSheet.create({
    // payment modal 
    modalstyle1: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    image: {
        width: width * .3,
        height: width * .3,
        resizeMode: 'contain',
        marginVertical: height * 0.04, 
    },
   
    title: {
        fontSize: width * .06,
        fontFamily: FONTS.semiBold,
        lineHeight:  width * .07,
        width: width * 0.65,
        textAlign: 'center',
        color: COLORS.primary,
    },
    text: {
        fontSize: width * .038,
        fontFamily: FONTS.regular,
        width: width * 0.75,
        textAlign: 'center',
        color: COLORS.gray,
        marginTop: height * 0.015,
    },
   
    btn: {
        width: width * 0.8,
        marginVertical: height * 0.03,
        alignSelf: 'center',
        borderRadius: height * .05,
    },
})