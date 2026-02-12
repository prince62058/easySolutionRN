import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  btn: {
    marginTop: width * 0.1,
    alignSelf: 'center',
  },

  img: {
    height: width * 0.34,
    width: width * 0.34,
    borderRadius: width * 0.34,
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: COLORS.gray20,
  },
  
  imgpickerbox: {
    marginTop: width * 0.075,
    marginVertical: width * 0.05,
    alignItems: 'center',
  },
  edit_btn: {
    width: width*.07,
    height: width*.07,
    borderRadius: 5,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.01,
    right: width * 0.02,
  },
});
