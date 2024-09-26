import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {GlobalError, mutationTrack, TrackI} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';

export const fetchTracks = createAsyncThunk<TrackI[], string>('tracks/fetchTracks', async (id: string, {rejectWithValue}) => {
  try {
    const {data: tracks} = await axiosApi.get<TrackI[]>(`/tracks?album=${id}`);
    return tracks;
  } catch (error) {
    return rejectWithValue(error)
  }
});


export const createTrack = createAsyncThunk<void, mutationTrack, {
  rejectValue: GlobalError, state: RootState
}>('track/create', async (trackMutation, {rejectWithValue, getState}) => {
  try {
    const token = getState().users.user?.token;
    if (!token) {
      console.error('No user token found');
    }
    await axiosApi.post('/tracks', trackMutation, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data)
    }
    throw e
  }
});

