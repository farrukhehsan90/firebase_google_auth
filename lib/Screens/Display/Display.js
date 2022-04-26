import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUserList} from '../../Store/Reducer/UserReducer';
import styles from './Display.style';
const Display = () => {
  const users = useSelector(selectUserList);
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Fullname: {users?.name}</Text>
      <Text style={styles.text}>Age: {users?.age}</Text>
    </View>
  );
};

export default Display;
