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
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '891358515516-eliv1mmsb7a5934g0r0psatp54gbbu37.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    console.log(user, 'user');

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
          console.log(user, 'useruser');
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
      //   console.log(idToken);
    } catch (error) {
      alert(error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //     // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //     // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //     // play services not available or outdated
      // } else {
      //     // some other error happened
      // }
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
      {/* <Button title="Login with google"
                onPress={() => { GoogleSignin.signOut(), GoogleSignin.revokeAccess() }} /> */}
    </View>
  );
};

export default Login;
