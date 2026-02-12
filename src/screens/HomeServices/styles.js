import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    ...FONTS.sixHundred,
    alignSelf: 'center',
  },
});
