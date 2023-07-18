import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppRoutes from './app.routes';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};
export function Routes() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppRoutes />
    </NavigationContainer>
  );
}
