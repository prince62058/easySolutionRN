import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.94,
  },
  btn: {
    width: width * 0.5,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  mapview: {
    width: width * 0.92,
    height: height * 0.4,
    alignSelf: 'center',
    borderRadius: 8,
  },
  mapimage: {
    width: width * 0.06,
    height: height * 0.05,
    resizeMode: 'contain',
  },
 
});
