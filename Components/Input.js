import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...styles.Input, ...props.style}} />;
};

const styles = StyleSheet.create({
  Input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10,
  },
});

export default Input;
