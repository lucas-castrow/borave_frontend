import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {RootStackParamList} from './RootStackParams';
import {CameraScreen} from '../screens/CameraScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProfileScreen} from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {FriendRequestsScreen} from '../screens/FriendRequestsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator();
const screenOptions: StackNavigationOptions = {
  headerShown: false,
};
const CameraIcon = ({color}: {color: string}) => (
  <Icon name="camera" color={color} size={24} />
);
function Home() {
  return (
    <Tab.Navigator initialRouteName="Message">
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => <CameraIcon color={color} />,
        }}
      />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppRoutes(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="FriendRequests" component={FriendRequestsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
export default AppRoutes;
