import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IconButton} from 'react-native-paper';

export function SendButton({
  size,
  color,
  backgroundColor,
  action,
}: {
  size: number;
  color?: string;
  backgroundColor?: string;
  action: () => void;
}) {
  const buttonSize: ViewStyle = {
    backgroundColor: color,
    width: size / 2,
    height: size / 2,
    borderRadius: size / 2,
  };
  return (
    <View style={[styles.button, buttonSize]}>
      <IconButton
        icon={'send-circle'}
        size={size}
        iconColor={backgroundColor}
        onPress={action}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});
