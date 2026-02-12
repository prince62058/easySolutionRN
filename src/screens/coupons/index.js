import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, } from "react-native";
import { COLORS, SIZES, icons, images, } from "../../constants";
import styles from "./styles";
import { connect } from "react-redux";
import Loader from "../../component/modalLoading";
import { http2 } from "../../services/api";
import NoDataBox from "../../component/noDataBox/NoDataBox";
import { GetAllCartcustomerIdApi } from "../../redux/actions/cartAction";




const Coupons = ({ navigation, userData, getCoupon, GetAllCartcustomerIdApi }) => {
    const [loading, setLoading] = useState(false)
    // const [postData, setPostData] = useState({
    //     user_id: userData?.id || null,
    //     owner_id: cartData?.data?.[0]?.owner_id || null,
    // })
    // const appliedCoupon = coupons?.find(i => i.code == cartData?.coupon_code)?.code || null;
    // console.log("appliedCoupon : ", appliedCoupon) 

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <Loader loading={loading} />

            {getCoupon?.[0] ?
                <FlatList
                    data={getCoupon}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={[styles.alert]}
                            onPress={() => {
                                // console.log("counponcode id :", item.couponCode, item._id),
                                  GetAllCartcustomerIdApi(item.couponCode, navigation, (data) => setLoading(data))}}
                        >
                            <Image style={styles.alertImage} source={item?.icon ? { uri: http2 + item?.icon } : ''} />
                            {/* <View  style={{...styles.alertImage,}}/> */}
                            <View>
                                <Text style={styles.alertTitle}>{item.couponName}</Text>
                                <Text style={styles.alertContent}>{item.couponCode}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    showsVerticalScrollIndicator={false}
                    key={({ _, index }) => index}
                />
                :
                <NoDataBox source={images.search_not_found} title={"Coupons Not Available"} />
            }
        </View>

    )
}

const mapStateToProps = (state) => ({
    getCoupon: state.cart.getCoupon,

})

const mapDispatchToProps = {
    GetAllCartcustomerIdApi
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
