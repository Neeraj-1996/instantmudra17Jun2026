import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
const Loader = props => {
  return props.showLoader ? (
    <View
      style={styles.container}>
      <View
        style={styles.middleView}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  ) : null;
};
export default Loader;
