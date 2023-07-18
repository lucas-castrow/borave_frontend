import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ErrorMessage = ({message}: {message: string}) => {
  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ErrorMessage;
