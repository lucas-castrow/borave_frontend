// friendThunks.ts
// Thunks assíncronos relacionados às solicitações de amizade

import {createAsyncThunk} from '@reduxjs/toolkit';
import {getFriendRequests} from '../../services/profileService';
import {setFriendRequests} from '../reducers/friendReducer';

export const fetchFriendRequests = createAsyncThunk(
  'friend/fetchFriendRequests',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const friendRequests = await getFriendRequests();
      dispatch(setFriendRequests(friendRequests));
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
    }
  },
);
export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      //const friends = await fetchFriendsFromAPI();
      //dispatch(setFriends(friends));
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
    }
  },
);
