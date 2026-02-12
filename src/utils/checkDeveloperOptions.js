import { NativeModules, ToastAndroid } from 'react-native';
import RNExitApp from 'react-native-exit-app';

const { DeveloperSettings } = NativeModules;

// Function to check if Developer Options are enabled
export default checkDeveloperOptions = () => {
    DeveloperSettings.isDeveloperOptionsEnabled((isEnabled) => {
        if (isEnabled) {
           
            if (__DEV__ == false) {
                ToastAndroid.show("Please switch off the Developer Mode", ToastAndroid.LONG)
                console.log("Developer Options are enabled", isEnabled);
                setTimeout(() => {
                    RNExitApp.exitApp();
                }, 200);
            }

        } 
        // else {
        //     ToastAndroid.show("Developer Options are disabled", ToastAndroid.LONG)
        //     console.log("Developer Options are disabled");
        // }
    });
};  
