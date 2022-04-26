import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './Welcome.style';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import RoutesKey from '../../Navigation/routesKey';
import {useDispatch, useSelector} from 'react-redux';
import {saveUser, selectUserList} from '../../Store/Reducer/UserReducer';
const Welcome = () => {
  const users = useSelector(selectUserList);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(
      saveUser({
        email: users.email,
        name: name,
        age: age,
      }),
    );
    firestore()
      .collection('users')
      .doc()
      .set({
        email: users.email,
        name: name,
        age: age,
      })
      .then(() => {
        alert('Data Stored');
        navigation.navigate(RoutesKey.DISPLAY);
      });
  };
  return (
    <View style={styles.main}>
      <Text>Email:{users.email}</Text>
      <Text>Fullname</Text>
      <TextInput onChangeText={name => setName(name)} style={styles.input} />
      <Text>Age</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={age => setAge(age)}
        style={styles.input}
      />
      <Button title="Submit" onPress={() => submit()} style={styles.btn} />
    </View>
  );
};

export default Welcome;
