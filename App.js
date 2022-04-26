import React from 'react'
import Routes from './lib/Navigation/routes';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { store } from './lib/Store/Store';
import { Provider } from 'react-redux';

PushNotification.configure({
  onRegister: function (token: any) {
    console.log('TOKEN welcome:', token);

  },

  onNotification: function (notification) {
    console.log('NOTIFICATIONS:', notification);
    // noticeAction();
  },
});
const App = () => {
  return (
    <NavigationContainer>
        <Provider store={store}>
      <Routes />
        </Provider>
    </NavigationContainer>
  )
}

export default App