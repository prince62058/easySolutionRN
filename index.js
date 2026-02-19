/**
 * @format
 */

import {LogBox} from 'react-native';

// Polyfill ViewPropTypes for legacy libraries
import * as ReactNative from 'react-native';

// Ensure this runs before ANY other imports that might use ViewPropTypes
const deprecatedPropTypes = require('deprecated-react-native-prop-types');

const {ViewPropTypes, ColorPropType, EdgeInsetsPropType, PointPropType} =
  deprecatedPropTypes;

global.ViewPropTypes = ViewPropTypes;

const polyfill = (name, propType) => {
  Object.defineProperty(ReactNative, name, {
    configurable: true,
    get: () => propType,
  });
};

polyfill('ViewPropTypes', ViewPropTypes);
polyfill('ColorPropType', ColorPropType);
polyfill('EdgeInsetsPropType', EdgeInsetsPropType);
polyfill('PointPropType', PointPropType);

// Also ensure View.propTypes etc are set
if (ReactNative.View && !ReactNative.View.propTypes) {
  ReactNative.View.propTypes = ViewPropTypes;
}

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import checkDeveloperOptions from './src/utils/checkDeveloperOptions';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'new NativeEventEmitter',
  'ReactImageView: Image source "null" doesn\'t exist',
  'ViewPropTypes will be removed from React Native',
]);

// Call the function whenever needed
checkDeveloperOptions();

AppRegistry.registerComponent(appName, () => App);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
