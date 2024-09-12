import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (id: string) => {
  const { data: tracks } = await axiosApi.get(`/tracks?album=${id}`);
  return tracks;
});
