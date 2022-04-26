import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesKey from './routesKey';
import Login from '../Screens/Login/Login';
import Welcome from '../Screens/Welcome/Welcome';
import Display from '../Screens/Display/Display';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name={RoutesKey.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesKey.WELCOME}
        component={Welcome}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={RoutesKey.DISPLAY}
        component={Display}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default Routes = () => {
  return (
    <>
      <StackNav />
    </>
  );
};
