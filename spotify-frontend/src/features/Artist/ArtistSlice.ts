import {ArtistI} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchArtist} from "./ArtistThunks.ts";

export interface ArtistState {
    artists: ArtistI[];
    isLoading: boolean;
}

const initialState: ArtistState = {
    artists: [],
    isLoading: false,
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
    },
    selectors: {
        selectArtist: (state) => state.artists,
        selectIsLoading: (state) => state.isLoading
    }
})

export const artistReducer = artistSlice.reducer;

export const {
    selectArtist,
    selectIsLoading,
} = artistSlice.selectors;