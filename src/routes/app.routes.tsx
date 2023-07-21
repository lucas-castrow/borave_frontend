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
import SplashScreen from '../screens/SplashScreen';
import {ColorValue} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator();
const screenOptions: StackNavigationOptions = {
  headerShown: false,
};
const CameraIcon = ({color}: {color: string}) => (
  <Icon name="camera" color={color} size={24} />
);

function IconShow(props: {
  icon: string;
  color: number | ColorValue | undefined;
}) {
  if (props.icon === 'camera') {
    return <Icon name="camera" color={props.color} size={24} />;
  } else if (props.icon === 'message') {
    return <Icon name="chatbubbles-outline" color={props.color} size={24} />;
  }
  return <Icon name="person-circle-outline" color={props.color} size={24} />;
}
export function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Message"
      screenOptions={{
        tabBarStyle: {display: 'none'},
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({color}) => IconShow({icon: 'camera', color: color}),
          swipeEnabled: false,
        }}
      />
      <Tab.Group
        screenOptions={{
          tabBarStyle: {display: 'flex'},
        }}>
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarIcon: ({color}) => IconShow({icon: 'message', color: color}),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => IconShow({icon: 'profile', color: color}),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export function AppRoutes(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* <Stack.Navigator> */}
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="FriendRequests" component={FriendRequestsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
