// friendActions.ts
// Actions relacionadas às solicitações de amizade

import {createAction} from '@reduxjs/toolkit';

export const fetchFriendRequests = createAction<void>(
  'friend/fetchFriendRequests',
);
export const fetchFriends = createAction<void>('friend/fetchFriends');
