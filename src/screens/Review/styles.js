import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.004,
  },
  reviewbox: {
    width: width,
    alignSelf: 'center',
    paddingHorizontal: width * 0.01,
    marginBottom: height * 0.01,
    borderStyle: 'dotted',
    borderBottomWidth: 1,
    borderColor: COLORS.gray20,
    paddingHorizontal: width * 0.04,
  },
  reviewimg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  reviewtext: {
    color: COLORS.black,
    fontSize: 12.5,
    ...FONTS.sixHundred,
    marginLeft: width * 0.03,
    marginBottom: -3,
  },
  reviewcontant: {
    color: COLORS.black,
    fontSize: 12.5,
    ...FONTS.fiveHundred,
    // marginBottom: -3,
    paddingBottom: height * 0.005,
  },
});
