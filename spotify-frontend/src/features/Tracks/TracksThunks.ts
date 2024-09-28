import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {GlobalError, mutationTrack, TrackI} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';

export const fetchTracks = createAsyncThunk<TrackI[], string, {
  state: RootState
}>('tracks/fetchTracks', async (id: string, {rejectWithValue}) => {
  try {
    const {data: tracks} = await axiosApi.get<TrackI[]>(`/tracks?album=${id}`,);
    return tracks;
  } catch (error) {
    return rejectWithValue(error)
  }
});


export const createTrack = createAsyncThunk<void, mutationTrack, {
  rejectValue: GlobalError, state: RootState
}>('track/create', async (trackMutation, {rejectWithValue,}) => {
  try {
    await axiosApi.post('/tracks', trackMutation,);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data)
    }
    throw e
  }
});

export const patchTrack = createAsyncThunk<void, string, { rejectValue: string, state: RootState }>(
  'track/patch',
  async (trackId, {rejectWithValue,}) => {
    try {
      await axiosApi.patch(`/tracks/${trackId}/togglePublished`, {},);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


export const deleteTrack = createAsyncThunk<void, string, {
  rejectValue: GlobalError, state: RootState
}>('track/delete', async (trackId, {rejectWithValue,}) => {
  try {

    await axiosApi.delete(`/tracks/${trackId}`,);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});