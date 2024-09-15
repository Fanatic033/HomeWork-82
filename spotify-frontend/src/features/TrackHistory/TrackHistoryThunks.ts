import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {GlobalError} from '../../types';
import {RootState} from '../../app/store.ts';


export const addTrackToHistory = createAsyncThunk<void, { track: string }, {
  rejectValue: GlobalError,
  state: RootState
}>(
  'trackHistory/addTrackToHistory',
  async ({track}, {rejectWithValue, getState}) => {
    try {
      const token = getState().users.user?.token;
      if (!token) {
        console.error('No user token found');
      }

      await axiosApi.post('/track_history', {track}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data)
      }
      throw e
    }
  }
);

