package com.ess.indiaonline;

import android.provider.Settings;
import android.content.Context;
import android.os.Build;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DeveloperSettingsModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    DeveloperSettingsModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "DeveloperSettings"; // This name will be used in React Native
    }

    @ReactMethod
    public void isDeveloperOptionsEnabled(Callback successCallback) {
        int devOptionsEnabled = 0;

        try {
            devOptionsEnabled = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.Global.DEVELOPMENT_SETTINGS_ENABLED);
        } catch (Settings.SettingNotFoundException e) {
            e.printStackTrace();
        }

        boolean isEnabled = devOptionsEnabled == 1;
        successCallback.invoke(isEnabled);  // Call back to React Native with the result
    }
}
