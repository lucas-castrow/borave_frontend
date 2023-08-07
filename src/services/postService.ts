import api from '../utils/api';
import {AxiosResponse, AxiosError} from 'axios';
import {retrieveProfile} from './authService';
export const sendPost = async (
  content: string,
  authorizedUsers: Array<string>,
): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = '/posts/sendPost';
    console.log(myId);
    const response: AxiosResponse = await api.post(url, {
      postedBy: myId,
      content: content,
      authorizedUsers: authorizedUsers,
    });
    return response.data.message;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Problema ao aceitar';

      throw new Error(errorMessage);
    }
    throw new Error('Problema ao aceitar');
  }
};

export const getPosts = async (): Promise<any> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    console.log(myId);
    const url = `/posts/${myId}`;
    const response: AxiosResponse = await api.get(url, {});
    return response.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err.response?.data?.message);
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Problema ao buscar solicitações';

      throw new Error(errorMessage);
    }
    throw new Error('Problema ao buscar solicitações');
  }
};
