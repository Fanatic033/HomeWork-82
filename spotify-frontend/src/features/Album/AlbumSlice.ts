import {AlbumI} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './AlbumThunks.ts';

interface AlbumState {
  albums: AlbumI[];
  isFetching: boolean;
}

const initialState: AlbumState = {
  albums: [],
  isFetching: false,
}

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.isFetching = true
    })
      .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
        state.isFetching = false;
        state.albums = albums
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.isFetching = false
      })
  },
  selectors: {
    selectAlbum: (state) => state.albums,
    selectFetching: (state) => state.isFetching,
  }
})

export const albumReducer = albumSlice.reducer;
export const {selectAlbum, selectFetching} = albumSlice.selectors