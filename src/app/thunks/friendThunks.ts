import {createAsyncThunk} from '@reduxjs/toolkit';
import {getFriendRequests, getFriends} from '../../services/profileService';
import {setFriendRequests, setFriends} from '../reducers/friendReducer';

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
      const friends = await getFriends();
      dispatch(setFriends(friends));
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
    }
  },
);
