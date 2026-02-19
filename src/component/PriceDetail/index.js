import {Text, View} from 'react-native';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

const PriceDetail = ({
  itemQty,
  price,
  discount,
  cDiscount,
  total,
  tax,
  taxAmt,
}) => {
  return (
    <View style={styles.box4}>
      <Text style={styles.text2}>Payment Summary</Text>
      <View style={styles.box5}>
        <Text style={[styles.text3, {width: width * 0.6}]}>
          Price ({itemQty} product)
        </Text>
        <Text style={styles.text3}>₹{price}</Text>
      </View>
      {tax && (
        <View style={styles.box5}>
          <Text style={[styles.text3, {width: width * 0.6}]}>Tax & Fee</Text>
          <Text style={styles.text3}>{tax}</Text>
        </View>
      )}
      {taxAmt && (
        <View style={styles.box5}>
          <Text style={[styles.text3, {width: width * 0.6}]}>Tax Amount</Text>
          <Text style={styles.text3}>₹{taxAmt > 0 ? taxAmt : 0}</Text>
        </View>
      )}
      {discount && (
        <View style={styles.box5}>
          <Text style={[styles.text3, {width: width * 0.6}]}>Discount</Text>
          <Text style={styles.text3}>₹{discount > 0 ? discount : 0}</Text>
        </View>
      )}
      <View style={styles.box5}>
        <Text style={[styles.text3, {width: width * 0.6}]}>
          Delivery Charge
        </Text>
        <Text style={{color: COLORS.success, fontSize: 12}}>Free Delivery</Text>
      </View>
      <View style={styles.box5}>
        <Text style={[styles.text3, {width: width * 0.6}]}>
          Coupons Discount
        </Text>
        <Text style={styles.text3}>₹{cDiscount > 0 ? cDiscount : 0}</Text>
      </View>
      <View style={styles.save}></View>
      <View style={styles.box5}>
        <Text style={[styles.text4, {width: width * 0.6}]}>Total Amount</Text>
        <Text style={styles.text4}>₹{total}</Text>
      </View>
      {cDiscount > 0 && (
        <>
          <View style={styles.save}></View>
          <Text style={styles.text5}>
            You will save ₹{cDiscount} on this order
          </Text>
        </>
      )}
    </View>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({
  save: {
    width: width * 0.92,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
    marginVertical: height * 0.005,
  },

  text1: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },

  box4: {
    borderWidth: 1,
    borderColor: COLORS.gray20,
    padding: width * 0.02,
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 10,
    // marginBottom: height * 0.02,
  },
  box5: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginLeft: width * 0.03,
  },
  text2: {
    fontSize: 15,
    color: COLORS.black,
    marginLeft: width * 0.03,
    fontFamily: FONTS.medium,
  },
  text3: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  text4: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  text5: {
    color: '#EE2761',
    margin: width * 0.01,
    marginLeft: width * 0.035,
    fontSize: 11,
    // padding: 5,
    fontFamily: FONTS.regular,
  },
  text6: {
    fontSize: 14,
    marginLeft: width * 0.06,
    marginTop: height * 0.0002,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    marginBottom: -2,
  },
});
