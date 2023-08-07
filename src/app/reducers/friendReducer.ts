// store/profileSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProfileType} from '../../types/types';

interface FriendState {
  friendsRequests: ProfileType[];
  friends: ProfileType[];
}

const initialState: FriendState = {
  friendsRequests: [],
  friends: [],
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriendRequests(state, action: PayloadAction<ProfileType[]>) {
      state.friendsRequests = action.payload;
    },
    setFriends(state, action: PayloadAction<ProfileType[]>) {
      state.friends = action.payload;
    },
    removeFriendRequestById(state: any, action: PayloadAction<string>) {
      if (state.friendsRequests) {
        state.friendsRequests = state.friendsRequests.filter(
          (friend: {id: string}) => friend.id !== action.payload,
        );
      }
    },
  },
});

export const {setFriendRequests, setFriends, removeFriendRequestById} =
  friendSlice.actions;

export default friendSlice.reducer;
