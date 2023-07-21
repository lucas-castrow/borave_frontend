// store/profileSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Profile {
  _id: string;
  userId: string;
  name: string;
  friends: string[];
  friendRequests: string[];
  friendLevelStories: {[friendId: string]: any};
}

interface ProfileState {
  profile: Profile | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state: any, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
    },
    addFriend(state: any, action: PayloadAction<string>) {
      if (state.profile) {
        state.profile.friends.push(action.payload);
      }
    },
    removeFriend(state: any, action: PayloadAction<string>) {
      if (state.profile) {
        state.profile.friends = state.profile.friends.filter(
          (friendId: string) => friendId !== action.payload,
        );
      }
    },
    sendFriendRequest(state: any, action: PayloadAction<string>) {
      if (state.profile) {
        state.profile.friendRequests.push(action.payload);
      }
    },
    acceptFriendRequest(state: any, action: PayloadAction<string>) {
      if (state.profile) {
        state.profile.friendRequests = state.profile.friendRequests.filter(
          (friendId: string) => friendId !== action.payload,
        );
        state.profile.friends.push(action.payload);
      }
    },
    declineFriendRequest(state: any, action: PayloadAction<string>) {
      if (state.profile) {
        state.profile.friendRequests = state.profile.friendRequests.filter(
          (friendId: string) => friendId !== action.payload,
        );
      }
    },
    updateFriendLevelStories(
      state: any,
      action: PayloadAction<{friendId: string; stories: any}>,
    ) {
      if (state.profile) {
        const {friendId, stories} = action.payload;
        state.profile.friendLevelStories[friendId] = stories;
      }
    },
  },
});

export const {
  setProfile,
  addFriend,
  removeFriend,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  updateFriendLevelStories,
} = profileSlice.actions;

export default profileSlice.reducer;
