import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {ArtistI, GlobalError, mutationArtist} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';


export const fetchArtist = createAsyncThunk<ArtistI[], void, { state: RootState }>(
  'artist/fetchAll',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    const config = token
      ? {headers: {Authorization: `Bearer ${token}`}}
      : {};
    const {data: artists} = await axiosApi.get<ArtistI[]>('/artists', config);
    return artists;
  }
);

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

export const patchArtist = createAsyncThunk<void, string, { rejectValue: string, state: RootState }>(
  'artist/patch',
  async (artistId, {rejectWithValue, getState, dispatch}) => {
    try {
      const token = getState().users.user?.token;
      if (!token) {
        console.error('No user token found');
        return;
      }
      await axiosApi.patch(
        `/artists/${artistId}/togglePublished`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchArtist())
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


export const deleteArtist = createAsyncThunk<void, string, {
  rejectValue: GlobalError, state: RootState
}>('artist/delete', async (artistId, {rejectWithValue, getState,dispatch}) => {
  try {
    const token = getState().users.user?.token;
    if (!token) {
      console.error('No user token found');
    }
    await axiosApi.delete(`/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchArtist())
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});






