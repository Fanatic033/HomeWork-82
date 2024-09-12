import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';


export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async (id: string) => {
    const {data: albums} = await axiosApi.get(`/albums?artist=${id}`)
  return albums
  }
)

