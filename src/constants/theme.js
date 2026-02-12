import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary
  primary: '#EC2F07',
  group: '#00B389',

  // secondary
  red: '#F32D2B',
  border: '#CEC4C4',
  pink: '#CEC4C4',
  prime: '#EC2F07',
  prime1: '#FE436C4D',

  // light
  light: '#CDCDCD',

  //white
  white: '#FFFFFF',

  // black
  black: '#000000',
  black1: 'rgba(100, 100, 100, 1)',
  black25: 'rgba(0, 0, 0, 0.25)',

  // blue
  blue: '#1080E9',
  success: '#389218',
  purple: "purple",
  pending: "#ebc034",

  // grey
  gray: '#616161',
  gray1: 'rgba(101, 98, 98, 1)',
  gray10: 'rgba(89, 84, 84, 1)',
  // gray10: "#E5E5E5",
  gray20: '#CCCCCC',
  gray30: '#A1A1A1',
  gray40: '#999999',
  gray50: '#7F7F7F',
  gray60: '#666666',
  gray70: '#4C4C4C',
  gray80: '#333333',
  gray85: '#242526',
  gray90: '#191919',

  // lightGray
  lightGray: '#C1C1C1',
  lightGray1: '#DDDDDD',
  lightGray10: 'rgba(242, 242, 242, 1)',
  lightGray31: 'rgba(196, 196, 196, 0.31)',

  // yellow
  yellow: '#FFC107',

  // orange
  orange: '#FF3D00',

  // green
  green: '#00FF47',
  green10: 'rgba(30, 125, 40, 1)',
  green1: 'rgba(71, 183, 43, 1)',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  padding1: 15,
  margin: 20,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  //Font family
  black: 'Poppins-Black-900',
  bold: 'Poppins-Bold-700',
  semiBold: 'Poppins-SemiBold-600',
  medium: 'Poppins-Medium-500',
  regular: 'Poppins-Regular-400',
  light: 'Poppins-Light-300',
  thin: 'Poppins-Thin-250',

  fourHundred: { fontFamily: 'Poppins-Regular-400' },
  fiveHundred: { fontFamily: 'Poppins-Medium-500' },
  sixHundred: { fontFamily: 'Poppins-SemiBold-600' },
  sevenHundred: { fontFamily: 'Poppins-Bold-700' },
  eightHundred: { fontFamily: 'Poppins-ExtraBold-800' },
  nineHundred: { fontFamily: 'Poppins-Black-900' },
};

export const darkTheme = {
  backgroundColor: COLORS.darkBackground,
};

export const lightTheme = {
  backgroundColor: COLORS.white,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
