import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {AlbumI, GlobalError, mutationAlbum} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';


export const fetchAlbums = createAsyncThunk<AlbumI[], string, {
  state: RootState
}>('albums/fetchAlbums', async (id: string, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token
      const config = token
        ? {headers: {Authorization: `Bearer ${token}`}}
        : {};
      const {data: albums} = await axiosApi.get<AlbumI[]>(`/albums?artist=${id}`, config);
      return albums
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)


export const createAlbum = createAsyncThunk<void, mutationAlbum, {
  rejectValue: GlobalError, state: RootState
}>('products/create', async (albumMutation, {rejectWithValue, getState}) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof mutationAlbum)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const token = getState().users.user?.token;
    if (!token) {
      console.error('No user token found');
    }
    await axiosApi.post('/albums', formData, {
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

export const patchAlbum = createAsyncThunk<void, string, { rejectValue: string, state: RootState }>(
  'artist/patch',
  async (albumId, {rejectWithValue, getState,}) => {
    try {
      const token = getState().users.user?.token;
      if (!token) {
        console.error('No user token found');
        return;
      }
      await axiosApi.patch(
        `/albums/${albumId}/togglePublished`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


export const deleteAlbum = createAsyncThunk<void, string, {
  rejectValue: GlobalError, state: RootState
}>('artist/delete', async (albumId, {rejectWithValue, getState,}) => {
  try {
    const token = getState().users.user?.token;
    if (!token) {
      console.error('No user token found');
    }
    await axiosApi.delete(`/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
