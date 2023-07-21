import {configureStore, combineReducers} from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';
import friendReducer from './reducers/friendReducer';
const rootReducer = combineReducers({
  profile: profileReducer,
  friend: friendReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
