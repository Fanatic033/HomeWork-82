import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {ArtistI, GlobalError, mutationArtist} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';


export const fetchArtist = createAsyncThunk<ArtistI[], void>('artist/fetchAll', async () => {
  const {data: artists} = await axiosApi.get<ArtistI[]>('/artists');
  return artists;
});


export const createArtist = createAsyncThunk<void, mutationArtist, {
  rejectValue: GlobalError, state: RootState
}>('album/create', async (artistMutation, {rejectWithValue, getState}) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof mutationArtist)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const token = getState().users.user?.token;
    if (!token) {
      console.error('No user token found');
    }
    await axiosApi.post('/artists', formData, {
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

