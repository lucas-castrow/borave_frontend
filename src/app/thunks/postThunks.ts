import {createAsyncThunk} from '@reduxjs/toolkit';
import {addPostsList} from '../reducers/postsReducer';
import {getPosts} from '../../services/postService';
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const posts = await getPosts();
      console.log(posts);
      dispatch(addPostsList(posts));
      return posts;
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
    }
  },
);
