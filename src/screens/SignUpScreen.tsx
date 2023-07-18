import React from 'react';
import {View, StyleSheet} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes/RootStackParams';
import {StackNavigationProp} from '@react-navigation/stack';

type SignUpScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenProp>();
  return (
    <View style={styles.container}>
      <SignUpForm
        onLoginPress={() => navigation.navigate('Login')}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
