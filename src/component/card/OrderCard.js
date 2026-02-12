import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants'

const OrderCard = ({ source, status, title, orderNo, date, price, name, onPress, mb, subtitle }) => {
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
        // 'MULTI_STATUS'
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
        <TouchableOpacity activeOpacity={0.5} style={[styles.card, mb && { marginBottom: mb }]} onPress={onPress}>
            <View style={styles.image_row}>
                <View style={styles.image_box}>
                    <Image source={source} style={styles.image} />
                </View>
                <View >
                    <Text style={styles.order_no}>Order {orderNo}</Text>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text numberOfLines={1} style={styles.cate}>{subtitle}</Text>
                    <View style={[styles.btn, status == "CANCELLED" && { backgroundColor: COLORS.red, }, status == "PENDING" && { backgroundColor: "#ebc034" },]}>
                        <Text numberOfLines={1} style={{...styles.btn_text, marginBottom: status?.length > 10 ? 0 : -2}}>{label[statusList?.findIndex(i => i == status)]}</Text>
                    </View>
                    {/* <View style={styles.btn} >
                        <Text style={styles.btn_text}>{status}</Text>
                    </View> */}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.row}>
                    <Text style={styles.key}>Order Place</Text>
                    <Text style={styles.value}>{date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.key}>Total price</Text>
                    <Text style={styles.value}>₹{price}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.key}>Ship to :</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>
            </View>
            {/* <View style={styles.row1}>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn1} onPress={productPress}>
                    <Text style={styles.btn1_text}>Write Product review</Text>
                </TouchableOpacity>
                {status != "CANCELLED" &&
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn1} onPress={trackPress}>
                        <Text style={styles.btn1_text}>Track Package</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity activeOpacity={0.5} style={styles.btn1} onPress={deliveryPress}>
                    <Text style={styles.btn1_text}>Write Delivery review</Text>
                </TouchableOpacity>
            </View> */}
        </TouchableOpacity>
    )
}

OrderCard.defaultProps = {
    trackPress: null,
    deliveryPress: null,
    productPress: null,
    onPress: null,
}

export default OrderCard

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
        marginBottom: -5,
    },
    btn: {
        // width: SIZES.width * 0.23,
        height: SIZES.height * 0.03,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#61D38F',
        borderRadius: SIZES.width * .012,
        marginTop: SIZES.height * 0.01,
        paddingHorizontal: SIZES.width * .03,
    },
    btn_text: {
        // width: SIZES.width * 0.2,
        fontFamily: FONTS.bold,
        fontSize: SIZES.width * .026,
        color: COLORS.white,
        // marginBottom: -4,
        // borderWidth: 1,
        textAlign: 'center',
        alignSelf: 'center',
    },
    btn1: {
        width: SIZES.width * 0.4,
        height: SIZES.height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.width * .012,
        borderWidth: 1,
        borderColor: COLORS.gray30,

    },
    btn1_text: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .032,
        color: COLORS.gray30,
        marginBottom: -2,
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        rowGap: SIZES.height * .01,
        // marginTop: SIZES.height * .02,
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
    },
    key: {
        width: SIZES.width * .4,
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .03,
        color: COLORS.black,
        marginBottom: -4,
    },
    value: {
        width: SIZES.width * .4,
        fontFamily: FONTS.medium,
        fontSize: SIZES.width * .03,
        color: COLORS.black,
        marginBottom: -4,
    },

})