//import the navigator
import { createStackNavigator } from 'react-navigation';
import NavigationService from './src/utils/NavigationService';
// import the different screens
import LoadingContainer from './src/screens/containers/LoadingContainer';
import LoginContainer from './src/screens/containers/LoginContainer';
import MainContainer from './src/screens/containers/MainContainer';
import DiaryContainer from './src/screens/containers/DiaryContainer';
import CameraContainer from './src/screens/containers/CameraContainer';
import RememberContainer from './src/screens/containers/RememberContainer';
// import firebase
import firebase from 'react-native-firebase';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';

import {setCustomTextInput, setCustomText} from 'react-native-global-props';

setCustomTextInput({
  underlineColorAndroid: '#0000',
  style: {
    fontFamily: 'Charmonman-Bold',
    fontSize: 16,
    backgroundColor: '#edee' ,
    borderRadius: 14,
    paddingHorizontal: 3,
  }   
});

setCustomText({
  style: {
    fontFamily: 'Charmonman-Bold',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.74)',
    borderRadius: 14,
    paddingHorizontal: 3,
  }   
});

const TopLevelNavigator = createStackNavigator(
  {
    LoadingContainer,
    LoginContainer,
    MainContainer,
    DiaryContainer,
    CameraContainer,
    RememberContainer,
  },
  {
    initialRouteName: 'LoadingContainer',
    headerMode: 'none',
  }
);

let config = {
  databaseURL: "https://memac-2f27b.firebaseio.com/",
  projectId: "memac-2f27b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
          <TopLevelNavigator
            ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}
          />
      </Provider>
    );
  }
}

export default App;