import React, {useState} from 'react';
import {View, Button, StyleSheet, Dimensions, Text} from 'react-native';
import {signUpUser, storeUserTokenSession} from '../services/authService';
import FormField from './FormField';
interface SignUpFormProps {
  onLoginPress: () => void;
  navigation: any;
}
const SignUpForm: React.FC<SignUpFormProps> = ({onLoginPress, navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [countError, setCountError] = useState<number>(0);

  const handleSignUp = async () => {
    try {
      const accessToken = await signUpUser(username, name, email, password);
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
        />
        <FormField
          label="Name"
          value={name}
          onChangeText={setName}
          error={error}
        />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
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
        <Button title="Sign Up" onPress={handleSignUp} />

        <Text style={styles.signUpText}>
          Já possui uma conta?{' '}
          <Text style={styles.signUpLink} onPress={onLoginPress}>
            Entre agora!
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
export default SignUpForm;
