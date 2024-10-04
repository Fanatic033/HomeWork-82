import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {AlbumI, GlobalError, mutationAlbum} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import {isAxiosError} from 'axios';

export const fetchAlbums = createAsyncThunk<
  AlbumI[],
  string,
  {
    state: RootState;
  }
>('albums/fetchAlbums', async (id: string, {rejectWithValue}) => {
  try {
    const {data: albums} = await axiosApi.get<AlbumI[]>(
      `/albums?artist=${id}`,
    );
    return albums;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createAlbum = createAsyncThunk<
  void,
  mutationAlbum,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('products/create', async (albumMutation, {rejectWithValue}) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof mutationAlbum)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const patchAlbum = createAsyncThunk<
  void,
  string,
  { rejectValue: string; state: RootState }
>('artist/patch', async (albumId, {rejectWithValue}) => {
  try {
    await axiosApi.patch(`/albums/${albumId}/togglePublished`, {});
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deleteAlbum = createAsyncThunk<
  void,
  string,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('artist/delete', async (albumId, {rejectWithValue}) => {
  try {
    await axiosApi.delete(`/albums/${albumId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
