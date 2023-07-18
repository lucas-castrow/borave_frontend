import React, {useState} from 'react';
import {View, Button, Text, Dimensions, StyleSheet} from 'react-native';
import {loginUser, storeUserTokenSession} from '../services/authService';
import FormField from './FormField';
interface LoginFormProps {
  onSignUpPress: () => void;
  navigation: any;
}
const LoginForm: React.FC<LoginFormProps> = ({onSignUpPress, navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [countError, setCountError] = useState<number>(0);
  const handleLogin = async () => {
    try {
      const accessToken = await loginUser(username, password);
      setToken(accessToken);
      await storeUserTokenSession(accessToken);
      navigation.navigate('Home');
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        console.log(errorMessage);
        setError(errorMessage);
        setCountError(prevCount => prevCount + 1);
      } else {
        setError('Erro no login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginFormContainer}>
        <FormField
          label="Username"
          value={username}
          onChangeText={setUsername}
          error={error}
          countError={countError}
        />
        <FormField
          label="Password"
          value={password}
          type="password"
          onChangeText={setPassword}
          error={error}
          countError={countError}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.signUpText}>
          Ainda não tem uma conta?{' '}
          <Text style={styles.signUpLink} onPress={onSignUpPress}>
            Crie uma agora!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFormContainer: {
    width: width * 0.8,
  },
  signUpText: {
    marginTop: 10,
    textAlign: 'center',
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
export default LoginForm;
