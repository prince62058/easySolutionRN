import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../constants';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray10,
    flex: 1,
  },

  box: {
    width: width * .94,
    alignSelf: 'center',
    marginTop: height * .02,
    backgroundColor: COLORS.white,
    borderRadius: width * .02,
    paddingVertical: height * .012,
  },
  text_row: {
    width: width * .86,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * .01,
  },
  key: {
    width: width * .34,
    color: COLORS.black,
    fontSize: width * .038,
    fontFamily: FONTS.medium,
    marginBottom: -4,
    // borderWidth: 1,
  },
  value: {
    width: width * .5,
    color: COLORS.gray30,
    fontSize: width * .036,
    fontFamily: FONTS.regular,
    marginBottom: -4,
    // borderWidth: 1,
    textAlign: 'right',
  },
  status: {
    maxWidth: width * .5,
    color: COLORS.purple,
    fontSize: width * .036,
    fontFamily: FONTS.medium,
    marginBottom: -4,
    // borderWidth: 1,
    backgroundColor: COLORS.lightGray10,
    textAlign: 'right',
    paddingTop: 4,
    paddingHorizontal: width * .03,
    borderRadius: 5,
  },
  btn: {
    height: height * 0.056,
    width: width * 0.94,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    marginTop: height * .02,
    borderRadius: width * .02,
  },
  btn_text: {
    color: COLORS.white,
    fontSize: width * .04,
    fontFamily: FONTS.medium,
    marginBottom: -4,
    // borderWidth: 1,
    marginLeft: width * .03,
  },
  hr: {
    width: width * .86,
    alignSelf: 'center',
    borderBottomWidth: 1.2,
    borderColor: COLORS.gray20,
    marginBottom: height * .01,
  }
});
