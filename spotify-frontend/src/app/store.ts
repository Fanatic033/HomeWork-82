import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from '../features/Artist/ArtistSlice.ts';
import {albumReducer} from '../features/Album/AlbumSlice.ts';
import {tracksReducer} from '../features/Tracks/TracksSlice.ts';
import {usersReducer} from '../features/User/UserSlice.ts';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {trackHistoryReducer} from '../features/TrackHistory/TrackHistorySlice.ts';

const usersPersistConfig = {
  key: 'spotify',
  storage,
  whiteList: ['user', 'track'],
}

const rootReducer = {
  artist: artistReducer,
  album: albumReducer,
  track: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  },
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;