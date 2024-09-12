import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {AlbumI} from '../../types.ts';


export const fetchAlbums = createAsyncThunk<AlbumI[], string>('albums/fetchAlbums', async (id: string,{rejectWithValue}) => {
  try {

    const {data: albums} = await axiosApi.get<AlbumI[]>(`/albums?artist=${id}`)
    return albums
  }
  catch(error) {
    return rejectWithValue(error);
  }
  }
)

