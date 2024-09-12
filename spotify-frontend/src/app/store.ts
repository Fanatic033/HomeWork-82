import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from '../features/Artist/ArtistSlice.ts';
import {albumReducer} from '../features/Album/AlbumSlice.ts';
import {tracksReducer} from '../features/Tracks/TracksSlice.ts';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;