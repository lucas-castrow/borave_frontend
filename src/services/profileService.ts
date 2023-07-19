import api from '../utils/api';
import {AxiosResponse, AxiosError} from 'axios';
import {retrieveProfile} from './authService';

export const addFriend = async (friendUsername: string): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/addFriend/${myId}/${friendUsername}`;
    const headers = {
      Authorization: `Bearer ${profile.token}`,
    };
    const response: AxiosResponse = await api.post(url, {}, {headers});
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

export const getFriendsRequests = async (): Promise<any> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/friendsRequests/${myId}`;
    console.log(url);
    console.log(profile.token);
    const headers = {
      Authorization: `Bearer ${profile.token}`,
    };
    const response: AxiosResponse = await api.get(url, {headers});
    console.log(response.data);
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

export const acceptFriendship = async (id: string): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/acceptFriendship/${myId}/${id}`;
    const headers = {
      Authorization: `Bearer ${profile.token}`,
    };
    const response: AxiosResponse = await api.post(url, {}, {headers});
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

export const declineFriendship = async (id: string): Promise<string> => {
  try {
    const profile = await retrieveProfile();
    const myId = profile.profile.id;
    const url = `/profile/declineFriendship/${myId}/${id}`;
    const headers = {
      Authorization: `Bearer ${profile.token}`,
    };
    const response: AxiosResponse = await api.post(url, {}, {headers});
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
