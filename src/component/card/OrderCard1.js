import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'

const OrderCard1 = ({ source, title, orderNo, subtitle, date, deliveryDate, paymentMode, onPress, status, mb, disable, imagePress }) => {
    const statusList = [
        'PENDING',
        'ORDERED',
        'CANCELLED',
        'ACCEPTED',
        'SHIPPED',
        'OUT_OF_DELIVERY',
        'DELIVERED',
        'RETURN_REQUEST',
        'RETURN_REQUEST_APPROVED',
        'RETURNED',
        'MULTI_STATUS',
    ];
    const label = [
        'PENDING',
        'ORDERED',
        'CANCELLED',
        'ACCEPTED',
        'SHIPPED',
        'OUT OF DELIVERY',
        'DELIVERED',
        'RETURN REQUEST',
        'RETURN REQUEST APPROVED',
        'RETURNED',
        // 'MULTI STATUS'
    ];


    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disable} onPress={onPress} style={[styles.card, mb && { marginBottom: mb }]}>
            <View style={styles.image_row}>
                <TouchableOpacity activeOpacity={0.6} style={styles.image_box} disabled={!imagePress} onPress={imagePress}>
                    <Image source={source} style={styles.image} />
                </TouchableOpacity>
                <View >
                    <Text style={styles.order_no}>Order {orderNo}</Text>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text numberOfLines={1} style={styles.cate}>{subtitle}</Text>
                    <View style={[styles.btn, status == "CANCELLED" && { backgroundColor: COLORS.red, }, status == "PENDING" && { backgroundColor: "#ebc034" },]}>
                        <Text numberOfLines={1} style={{...styles.btn_text, marginBottom: status?.length > 10 ? 0 : -2}}>{label[statusList?.findIndex(i => i == status)] || status}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                {date &&
                    <View style={styles.row}>
                        <Text style={styles.key}>Ordered On :</Text>
                        <Text style={styles.value}>{date}</Text>
                    </View>
                }
                {deliveryDate &&
                    <View style={styles.row}>
                        <Text style={styles.key}>Delivered :</Text>
                        <Text style={styles.value}>{deliveryDate}</Text>
                    </View>
                }
                <View style={styles.row}>
                    <Text style={styles.key}>Payment Method :</Text>
                    <Text style={styles.value}>{paymentMode}</Text>
                </View>
            </View>


        </TouchableOpacity>
    )
}

OrderCard1.defaultProps = {
    disable: false,
    onPress: null,
}

export default OrderCard1

const styles = StyleSheet.create({
    card: {
        width: SIZES.width * .92,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: SIZES.width * .02,
        borderColor: COLORS.gray30,
        alignSelf: 'center',
        padding: SIZES.width * .03,
        // paddingVertical: SIZES.height * .01,
        marginVertical: SIZES.height * .01,
    },
    image_box: {
        height: SIZES.width * 0.24,
        width: SIZES.width * 0.24,
        borderWidth: 1,
        borderColor: COLORS.gray20,
        borderRadius: SIZES.width * .02,
        marginRight: SIZES.width * .03,
        overflow: 'hidden',
    },
    image: {
        height: SIZES.width * 0.24,
        width: SIZES.width * 0.24,
        borderRadius: SIZES.width * .02,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    image_row: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    order_no: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .032,
        color: 'rgba(90, 105, 117, 1)',
        // marginBottom: -4,
    },
    cate: {
        width: SIZES.width * 0.57,
        fontFamily: FONTS.regular,
        fontSize: SIZES.width * .03,
        color: 'rgba(90, 105, 117, 1)',
        marginBottom: -4,
    },
    title: {
        width: SIZES.width * 0.57,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.width * .04,
        color: COLORS.red,
        // borderWidth: 1,
        marginBottom: -4,
    },
    btn: {
        // width: SIZES.width * 0.23,
        height: SIZES.height * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#61D38F',
        borderRadius: SIZES.width * .012,
        marginTop: SIZES.height * 0.01,
        alignSelf: 'flex-start',
        paddingHorizontal: SIZES.width * .03,
    },
    btn_text: {
        // width: SIZES.width * 0.2,
        fontFamily: FONTS.bold,
        fontSize: SIZES.width * .026,
        color: COLORS.white,
        textAlign: 'center',
        alignSelf: 'center',
    },
    box: {
        marginVertical: SIZES.height * .02
    },
    row: {
        width: SIZES.width * .85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: SIZES.height * .005,
        // borderWidth: 1,
    },
    key: {
        width: SIZES.width * .4,
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .03,
        color: COLORS.black,
        marginBottom: -4,
        // borderWidth: 1,
    },
    value: {
        width: SIZES.width * .4,
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .03,
        color: COLORS.black,
        marginBottom: -4,
        // borderWidth: 1,
    },

})