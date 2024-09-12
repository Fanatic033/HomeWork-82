import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {TrackI} from '../../types.ts';

export const fetchTracks = createAsyncThunk<TrackI[], string>('tracks/fetchTracks', async (id: string,{rejectWithValue}) => {
  try {
    const { data: tracks } = await axiosApi.get<TrackI[]>(`/tracks?album=${id}`);
    return tracks;
  }catch (error){
    return  rejectWithValue(error)
  }
});
