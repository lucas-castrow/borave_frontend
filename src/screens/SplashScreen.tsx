// SplashScreen.js
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {retrieveProfile} from '../services/authService';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/RootStackParams';
type SplashScreenProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenProp>();
  useEffect(() => {
    const checkUserProfile = async () => {
      const session = await retrieveProfile();
      if (session !== null) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    };

    checkUserProfile();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../assets/animations/splash_animation.json')}
        autoPlay
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
