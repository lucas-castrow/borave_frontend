import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostType} from '../../types/types';

interface PostState {
  posts: PostType[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostType>) {
      state.posts.push(action.payload);
    },
    removePostById(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost(state, action: PayloadAction<PostType>) {
      const updatedPost = action.payload;
      state.posts = state.posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post,
      );
    },
    addPostsList(state, action: PayloadAction<PostType[]>) {
      state.posts.push(...action.payload);
    },
  },
});

export const {addPost, removePostById, updatePost, addPostsList} =
  postSlice.actions;

export default postSlice.reducer;
