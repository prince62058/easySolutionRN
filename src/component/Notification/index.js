import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS, images } from '../../constants';

const Notification = ({ img, text1, text2, imgcontainer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.box1}>
          <Image style={styles.icons} source={img} />
          {/* <ImageBackground style={styles.iconsContainer} source={imgcontainer}>
            <Image style={styles.icons} source={img} />
          </ImageBackground> */}
          <View>
            <Text style={styles.text1}>{text1}</Text>
            <Text style={styles.text2}>{text2}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  iconsContainer: {
    width: width * 0.15,
    height: height * 0.076,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: -width * 0.035,
  },
  icons: {
    width: width * 0.2,
    height:  width * 0.2,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: COLORS.gray20,
    borderRadius: width * 0.2,
  },
  box1: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray10,
    marginHorizontal: width * 0.04,
    marginTop: height * 0.022,
    gap: 20,
    height: height * 0.115,
    width: width * 0.9,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text1: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    marginBottom: -3,
    color: COLORS.gray,
  },
  text2: {
    fontSize: 11,
    fontFamily: FONTS.light,
    marginBottom: -3,
    color: COLORS.gray,
  },
});
