import {AlbumI} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createAlbum, fetchAlbums} from './AlbumThunks.ts';

interface AlbumState {
  albums: AlbumI[];
  isFetching: boolean;
  isCreatingAlbum: boolean;
}

const initialState: AlbumState = {
  albums: [],
  isFetching: false,
  isCreatingAlbum: false,
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
    builder
      .addCase(createAlbum.pending, (state) => {
        state.isCreatingAlbum = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.isCreatingAlbum = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.isCreatingAlbum = false
      })
  },
  selectors: {
    selectAlbum: (state) => state.albums,
    selectFetching: (state) => state.isFetching,
    selectIsCreatingAlbum: (state) => state.isCreatingAlbum,
  }
})

export const albumReducer = albumSlice.reducer;
export const {selectAlbum, selectFetching,selectIsCreatingAlbum} = albumSlice.selectors