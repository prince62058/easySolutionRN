import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    width: width * 0.94,
    alignSelf: 'center',
    flex: 1,
    marginBottom: 5,
  },
  chatimage: {
    width: width * 0.44,
    height: height * 0.2,
    resizeMode: 'stretch',
    marginBottom: 5,
    // borderRadius: 24,
    // borderTopRightRadius: 0,
  },
  videoPlayer:{
    width: width*.6,
    height: height * 0.25,
  },
  rightimgbox: {
    width: width * 0.44,
    height: height * 0.2,
    alignSelf: 'flex-end',
    marginVertical: height * 0.01,
  },
  chatimageleft: {
    width: width * 0.44,
    height: height * 0.2,
    resizeMode: 'stretch',
    borderTopLeftRadius: 0,
    borderRadius: 24,
  },
  leftimgbox: {
    width: width * 0.44,
    height: height * 0.2,
    alignSelf: 'flex-start',
    marginVertical: height * 0.01,
  },
  lefttext: {
    fontSize: width * 0.034,
    ...FONTS.fourHundred,
    color: COLORS.black,
  },
  time: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: width * 0.2,
    fontSize: width * 0.034,
    ...FONTS.fourHundred,
    color: COLORS.black,
  },
  leftBox: {
    borderWidth: 1,
    borderRadius: 22,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    width: width * 0.8,
    borderColor: COLORS.gray10,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.012,
    marginVertical: height * 0.01,
  },
  rightBox: {
    borderWidth: 1,
    borderRadius: 22,
    borderTopRightRadius: 0,
    width: width * 0.8,
    borderColor: 'rgba(228, 228, 228, 1)',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.012,
    marginTop: height * 0.01,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(241, 245, 255, 1)',
    marginBottom: height * 0.006,
  },
  inputbox: {
    borderWidth: 1,
    width: width * 0.8,
    borderRadius: 22,
    borderColor: COLORS.gray10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
    marginLeft: width * 0.02,
    overflow:'hidden'
  },
  inputtext: {
    ...FONTS.fourHundred,
    fontSize: width * 0.036,
    marginBottom: -3,
    width: width * 0.56,
    marginLeft: width * 0.01,
    color: COLORS.black,
    // backgroundColor:COLORS.gray1,
    paddingVertical:9
  },
  smileiconbox: {
    width: width * 0.092,
    height: width * 0.09,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
  },
  smileicon: {
    width: width * 0.06,
    height: height * 0.03,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  fileattach2: {
    width: width * 0.06,
    height: height * 0.03,
    resizeMode: 'contain',
    tintColor: COLORS.blue,
  },
  fileattach3:{
    width: width * 0.09,
    height: height * 0.045,
    resizeMode: 'contain',
    tintColor: COLORS.blue,
  },
  micTouch:{
    // backgroundColor:COLORS.gray30,
    width:SIZES.width*.09,
    height:SIZES.height*.045,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    marginLeft:5
  },
  sendimg: {
    width: width * 0.11,
    height: width * 0.11,
    resizeMode: 'contain',
    marginHorizontal: width * 0.03,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  alliconbox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray10,
    marginVertical: height * 0.015,
    paddingVertical: height * 0.007,
    width: width * 0.7,
    borderRadius: 12,
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.026,
  },

  // --------------------

  rowdirextion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sixIconBox: {
    width: width * 0.9,
    backgroundColor: COLORS.black,
    paddingVertical: height * 0.02,
  },
  siximgtext: {
    color: COLORS.white,
  },



  // msg card
  msgText: {
    color: COLORS.gray80,
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .032
  },
  link:{
    color: COLORS.blue,
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .032,
    textDecorationLine:'underline',
  },
  msgCard: {
    minWidth: SIZES.width * .25,
    maxWidth: SIZES.width * .8,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    paddingHorizontal: SIZES.width * .025,
    paddingTop: 4,
    paddingBottom: SIZES.height * .02,
    borderRadius: 10,
    // borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
    marginTop: SIZES.height * .01
  },
  msgTime: {
    color: COLORS.gray60,
    fontSize: SIZES.width * .025,
    position: 'absolute',
    right: SIZES.width * .02,
    bottom: SIZES.height * .00,
    fontFamily: FONTS.regular,
  },



  micModalMain:{
    height:SIZES.height*.34,
    width:SIZES.width*.8,
    borderRadius:10,
    backgroundColor:COLORS.white,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  voiceLotti:{
    width:SIZES.width*.45,
    height:SIZES.width*.45
  },
  speakText:{
    color:COLORS.black,
    fontSize:SIZES.width*.045,
    fontFamily:FONTS.medium
  },

  // contact
  box: {
    width: SIZES.width * .7,
    height: SIZES.width * .7,
    elevation: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contact: {
    width: SIZES.width * .7,
    height: SIZES.width * .6,
    resizeMode: 'contain'
  },
  wait:{
    color:COLORS.black, 
    fontSize:SIZES.width*.036,
    fontFamily:FONTS.medium,
    textAlign: 'center'
  },

  // day box
  day:{
    color:COLORS.gray50, 
    fontSize:SIZES.width*.032,
    fontFamily:FONTS.medium,
    // textAlign: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingTop: 2,
    elevation: 2,
  },
  dotBox: {
    alignSelf: 'center',
    marginTop: SIZES.height * .01,
  },

  // question
  questionBox: {
    width: SIZES.width * .7,
    // height: SIZES.width * .7,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: "#00ff0022",
    paddingVertical: SIZES.height * .012,
    paddingHorizontal: SIZES.width * .02,
  },

  questionRow: {
    width: SIZES.width * .65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.height * .01,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    borderRadius: 5,
    paddingVertical: SIZES.height * .012,
    paddingHorizontal: SIZES.width * .02,
  },
  question: {
    width: SIZES.width * .5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .035,
    color: COLORS.blue,
    marginBottom: -4
  },
  questionText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .035,
    color: COLORS.black,
    marginBottom: -4
  },

  gifBox: {
    alignSelf: 'flex-end',
    marginHorizontal: SIZES.width * 0.02,
    marginBottom: SIZES.height * 0.02,
  },
  gif: {
    width: SIZES.width * 0.14,
    height: SIZES.height * 0.05,
    resizeMode: 'cover',
  },

});