import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Icons from '../Icons';

const EditProfile = ({ text, profileimage, onPress, t1, coverimage }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <View style={styles.box1}>
        <View style={styles.img_box}>
          <Image source={profileimage} style={[styles.img1, coverimage]} />
        </View>
        <Text style={[styles.text1, t1]}>{text}</Text>
        {/* <Image source={icons.profilearrow} style={styles.img2} /> */}
      </View>
      <Icons name={'right'} size={SIZES.width * .06} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  btn: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: height * 0.012,
    // borderWidth: 1,
  },
  box1: {
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_box: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.03,
  },
  img1: {
    height: width * 0.07,
    width: width * 0.07,
    resizeMode: 'contain',
  },
  
  text1: {
    // width: width * 0.71,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    fontSize: width * .041,
    marginBottom: -3,
  },
});
