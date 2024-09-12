import {TrackI} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from './TracksThunks.ts';

interface TracksState {
  tracks: TrackI[];
  trackFetching: boolean;
}

const initialState: TracksState = {
  tracks: [],
  trackFetching: false,
}

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.trackFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.trackFetching = false;
        state.tracks = tracks
      })
      .addCase(fetchTracks.rejected,(state) => {
        state.trackFetching = false
      })
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTrackFetching: (state) => state.trackFetching
  }
})


export const tracksReducer = tracksSlice.reducer;

export const {selectTracks, selectTrackFetching} = tracksSlice.selectors;