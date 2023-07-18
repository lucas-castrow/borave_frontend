import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginForm from '../components/LoginForm';
import {RootStackParamList} from '../routes/RootStackParams';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  return (
    <View style={styles.container}>
      <LoginForm
        onSignUpPress={() => navigation.navigate('SignUp')}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
