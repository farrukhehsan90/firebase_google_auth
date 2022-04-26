import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from './Login.style';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import RoutesKey from '../../Navigation/routesKey';
import {saveUser} from '../../Store/Reducer/UserReducer';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '891358515516-eliv1mmsb7a5934g0r0psatp54gbbu37.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    dispatch(saveUser({email: user.email}));
    firestore()
      .collection('users')
      .where('email', '==', user.email)
      .onSnapshot(snapshot => {
        const user = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (user.length) {
          dispatch(saveUser(user[0]));
          navigation.navigate(RoutesKey.DISPLAY);
        } else {
          navigation.navigate(RoutesKey.WELCOME);
        }
      });
  }

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      if ((await auth().signInWithCredential(googleCredential)) != null) {
        console.log(googleCredential);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('IN_PROGRESS....');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert('SOMETHING WENT WRONG');
      }
    }
  };
  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        source={require('../../assets/images-removebg-preview.png')}
      />
      <Button
        style={styles.btn}
        title="Login with google"
        onPress={() => onGoogleButtonPress()}
      />
    </View>
  );
};

export default Login;
