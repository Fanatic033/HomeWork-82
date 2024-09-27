import {ArtistI} from '../../types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createArtist, deleteArtist, fetchArtist} from './ArtistThunks.ts';

export interface ArtistState {
    artists: ArtistI[];
    isLoading: boolean;
    isCreating: boolean;
}

const initialState: ArtistState = {
  artists: [],
  isLoading: false,
  isCreating: false,
}

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArtist.fulfilled, (state, {payload: artist}) => {
                state.isLoading = false;
                state.artists = artist
            })
            .addCase(fetchArtist.rejected, (state) => {
                state.isLoading = false
            })
      builder
        .addCase(createArtist.pending, (state) => {
          state.isCreating = true
        })
        .addCase(createArtist.fulfilled,(state) => {
          state.isCreating = false
        })
        .addCase(createArtist.rejected,(state) => {
          state.isCreating = false
        })
        builder
          .addCase(deleteArtist.fulfilled,(state,{meta}) => {
            state.artists = state.artists.filter(artist => artist._id !== meta.arg);
          });
    },
    selectors: {
        selectArtist: (state) => state.artists,
        selectIsLoading: (state) => state.isLoading,
      selectIsCreating: (state) => state.isCreating,
    }
})

export const artistReducer = artistSlice.reducer;

export const {
    selectArtist,
    selectIsLoading,
  selectIsCreating
} = artistSlice.selectors;