import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { COLORS, SIZES } from '../../constants'
import { formattedDate3 } from '../../services/date'
import Icons from '../../component/Icons'
import { http2 } from '../../services/api'
import { viewFileFromUrl } from '../../services/fileSystem'
import Loader from '../../component/modalLoading'

const TextRow = ({ title, text, color, valueColor }) => {
    return (
        <View style={styles.text_row}>
            <Text numberOfLines={1} style={[styles.key, color && { color: color }]}>{title}</Text>
            <Text numberOfLines={1} style={[styles.value, color && { color: color || valueColor }]}>{text}</Text>
        </View>
    )
}

const Invoice = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const data = route?.params?.data
    let product = route?.params?.pId ? data?.product?.find(i => i?._id == route?.params?.pId) : null
    // const product = data?.product
    console.log("data : ", data);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
            <Loader loading={loading} />
            <View style={styles.box}>
                <TextRow title={"order Id"} text={data?._id} />
                <TextRow title={"Service"} text={product?.productId?.title} />
                {/* <TextRow title={"Category"} text={'ksdfjslfj'} /> */}
                <TextRow title={"Workers"} text={data?.partnerId ? data?.partnerId?.fullName : 'No Service Man Alloted Now'} />
                {data?.date && data?.time && <TextRow title={"Date & Time"} text={`${data?.date}`} />}
                <TextRow title={"Working Otp"} text={data?.workingOtp || data?.orderDetails?.workingOtp} />
                <TextRow title={"Completed Otp"} text={data?.completedOtp || data?.orderDetails?.completedOtp} />
                {/* <TextRow title={"Workering Hours"} text={'No'} /> */}
                <View style={styles.text_row}>
                    <Text numberOfLines={1} style={styles.key}>Status</Text>
                    <Text numberOfLines={1} style={styles.status}>{data?.status || data?.orderDetails?.status}</Text>
                </View>
            </View>
            
            <View style={styles.box}>
                {/* <TextRow title={product?.productId?.title} text={`₹${data?.netAmount}`} /> */}
                <TextRow title={"Service Charge"} text={`₹${Number(data?.netAmount || data?.orderDetails?.netAmount)?.toFixed(0)}`} />
                <TextRow title={"Tax Amount"} text={`₹${Number(data?.taxAmount || data?.orderDetails?.taxAmount)?.toFixed(2)}`} />
                <TextRow color={COLORS.purple} title={"Discount"} text={`${data?.totalOfferDiscount > 0 ? `-${data?.totalOfferDiscount}` : 0}`} />
                <View style={styles.hr} />
                <TextRow title={"Total"} valueColor={COLORS.purple} text={`₹${data?.orderTotal || data?.orderDetails?.orderTotal}`} />
                <TextRow title={"Payment Method"} text={data?.paymentMethod} />
                <View style={styles.text_row}>
                    <Text numberOfLines={1} style={styles.key}>Payment Status</Text>
                    <Text numberOfLines={1} style={styles.status}>{data?.paymentStatus ? "Paid" : "Unpaid"}</Text>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => viewFileFromUrl(http2 + data?.invoice, "download", (data) => setLoading(data))}>
                {/* {loading && <ActivityIndicator size={SIZES.width * .06} color={COLORS.white} />} */}
                <Icons name={'download'} size={SIZES.width * .06} color={COLORS.white} />
                <Text style={styles.btn_text}>Download PDF</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Invoice