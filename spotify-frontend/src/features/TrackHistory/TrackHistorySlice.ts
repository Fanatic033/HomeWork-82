import {createSlice} from '@reduxjs/toolkit';
import {addTrackToHistory, fetchHistoryTracks} from './TrackHistoryThunks';
import {GlobalError, TrackHistory} from '../../types';

interface TrackHistoryState {
  trackHistory: TrackHistory[];
  HistoryFetching: boolean;
  trackFetching: boolean;
  addTrackError: GlobalError | null;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  HistoryFetching: false,
  trackFetching: false,
  addTrackError: null,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.trackFetching = true;
        state.addTrackError = null;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.trackFetching = false;
      })
      .addCase(addTrackToHistory.rejected, (state, {payload: track}) => {
        state.trackFetching = false;
        state.addTrackError = track || null;
      });
    builder
      .addCase(fetchHistoryTracks.pending, (state) => {
        state.HistoryFetching = true
      })
      .addCase(fetchHistoryTracks.fulfilled, (state, {payload: track}) => {
        state.HistoryFetching = false;
        state.trackHistory = track
      })
      .addCase(fetchHistoryTracks.rejected, (state) => {
        state.HistoryFetching = false;
      })
  },
  selectors: {
    selectHistory: (state) => state.trackHistory,
    selectFetchingHistory: (state) => state.trackFetching,
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const {selectHistory} = trackHistorySlice.selectors