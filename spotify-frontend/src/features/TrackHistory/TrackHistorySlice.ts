import {createSlice} from '@reduxjs/toolkit';
import {addTrackToHistory} from './TrackHistoryThunks';
import {GlobalError} from '../../types';

interface TrackHistoryState {
  trackFetching: boolean;
  addTrackError: GlobalError | null;
}

const initialState: TrackHistoryState = {
  trackFetching: false,
  addTrackError: null,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.trackFetching = true;
      state.addTrackError = null;
    });
    builder.addCase(addTrackToHistory.fulfilled, (state) => {
      state.trackFetching = false;
    });
    builder.addCase(addTrackToHistory.rejected, (state, {payload: track}) => {
      state.trackFetching = false;
      state.addTrackError = track || null;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
