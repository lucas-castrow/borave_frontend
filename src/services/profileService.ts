import api from '../utils/api';
import {AxiosResponse, AxiosError} from 'axios';
import {retrieveProfile} from './authService';
import {useAppDispatch} from '../app/hooks';
import {removeFriendRequestById} from '../app/reducers/friendReducer';

export const addFriend = async (friendUsername: string): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/addFriend/${myId}/${friendUsername}`;
    const response: AxiosResponse = await api.post(url, {});
    return response.data.message;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Problema ao adicionar';

      throw new Error(errorMessage);
    }
    throw new Error('Problema ao adicionar');
  }
};

export const getFriendRequests = async (): Promise<any> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/friendsRequests/${myId}`;
    const headers = {
      Authorization: `Bearer ${profile.token}`,
    };
    const response: AxiosResponse = await api.get(url, {headers});
    return response.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Problema ao adicionar';

      throw new Error(errorMessage);
    }
    throw new Error('Problema ao adicionar');
  }
};

export const acceptFriendship = async (
  dispatch: any,
  id: string,
): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/acceptFriendship/${myId}/${id}`;
    const response: AxiosResponse = await api.post(url, {});
    dispatch(removeFriendRequestById(id));
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

export const declineFriendship = async (
  dispatch: any,
  id: string,
): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/declineFriendship/${myId}/${id}`;
    const response: AxiosResponse = await api.post(url, {});
    dispatch(removeFriendRequestById(id));
    return response.data.message;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorResponse: AxiosResponse | undefined = err.response;
      const errorMessage: string =
        errorResponse?.data?.message || 'Problema ao recusar';

      throw new Error(errorMessage);
    }
    throw new Error('Problema ao recusar');
  }
};
