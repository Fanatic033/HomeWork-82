import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ArtistI} from "../../types.ts";


export const fetchArtist = createAsyncThunk('artist/fetchAll',
  async  () => {
    const {data: artists} = await  axiosApi.get<ArtistI[]>('/artists');
    return artists;
    });

