import api from '../utils/api';
import {AxiosResponse, AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
export const signUpUser = async (
  username: string,
  name: string,
  email: string,
  password: string,
): Promise<string> => {
  try {
    const response: AxiosResponse = await api.post('/users/addUser', {
      username,
      name,
      password,
      email,
    });
    console.warn('Usuario criado com sucesso');
    return response.data.data.accessToken;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Erro ao criar usuario';

      throw new Error(errorMessage);
    }
    throw new Error('Erro ao criar usuario');
  }
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<string> => {
  try {
    const response: AxiosResponse = await api.post('/auth/login', {
      username,
      password,
    });
    console.warn('Usuario logado com sucesso');
    return response.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Erro no login';

      throw new Error(errorMessage);
    }
    throw new Error('Erro no login');
  }
};

export async function storeUserTokenSession(accessToken: string) {
  try {
    await EncryptedStorage.setItem(
      'user_token',
      JSON.stringify({
        profile: accessToken,
      }),
    );
  } catch (err) {
    console.error('Problem to save token');
  }
}
export async function retrieveProfile() {
  try {
    const session: string | null = await EncryptedStorage.getItem('user_token');

    if (session !== null) {
      return JSON.parse(session).profile;
    }
  } catch (error) {
    // There was an error on the native side
  }
}
