import React, {useEffect} from 'react';
import Routes from './lib/Navigation/routes';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './lib/Store/Store';
import {Provider} from 'react-redux';
import Firebase from './lib/config/firebase';

const App = () => {
  useEffect(() => {
    Firebase();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Routes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
