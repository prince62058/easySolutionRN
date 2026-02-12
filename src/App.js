import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Root from './Root';
import { Provider } from 'react-redux';
import { store, persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppState, BackHandler, NativeModules, ToastAndroid } from 'react-native';


const App = () => {

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     console.log("handleAppStateChange: ", nextAppState)
   
  //     if (nextAppState === 'background') {
        
  //     }
  //   };
  
  //   const appStateListener = AppState.addEventListener('change', handleAppStateChange);
  
  //   return () => {
  //     appStateListener.remove();
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
