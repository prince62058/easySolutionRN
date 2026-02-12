/**
 * @format
 */

import {AppRegistry, Text, TextInput, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import checkDeveloperOptions from './src/utils/checkDeveloperOptions';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'new NativeEventEmitter',
  'ReactImageView: Image source "null" doesn\'t exist',
]);

// Call the function whenever needed
checkDeveloperOptions();

AppRegistry.registerComponent(appName, () => App);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
