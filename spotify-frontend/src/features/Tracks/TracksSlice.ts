import { TrackI } from "../../types.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createTrack, fetchTracks } from "./TracksThunks.ts";

interface TracksState {
  tracks: TrackI[];
  trackFetching: boolean;
  createFetching: boolean;
}

const initialState: TracksState = {
  tracks: [],
  trackFetching: false,
  createFetching: false,
};

const tracksSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.trackFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.trackFetching = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.trackFetching = false;
      });
    builder
      .addCase(createTrack.pending, (state) => {
        state.createFetching = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createFetching = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createFetching = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTrackFetching: (state) => state.trackFetching,
    selectCreateFetching: (state) => state.createFetching,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const { selectTracks, selectTrackFetching, selectCreateFetching } =
  tracksSlice.selectors;
