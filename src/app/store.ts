import {configureStore, combineReducers} from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';
import friendReducer from './reducers/friendReducer';
import postsReducer from './reducers/postsReducer';
const rootReducer = combineReducers({
  profile: profileReducer,
  friend: friendReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
