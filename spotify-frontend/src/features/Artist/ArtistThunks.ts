import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { ArtistI, GlobalError, mutationArtist } from "../../types.ts";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

export const fetchArtist = createAsyncThunk<
  ArtistI[],
  void,
  { state: RootState }
>("artist/fetchAll", async (_) => {
  const { data: artists } = await axiosApi.get<ArtistI[]>("/artists");
  return artists;
});

export const createArtist = createAsyncThunk<
  void,
  mutationArtist,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>("album/create", async (artistMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof mutationArtist)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post("/artists", formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const patchArtist = createAsyncThunk<
  void,
  string,
  { rejectValue: string; state: RootState }
>("artist/patch", async (artistId, { rejectWithValue, dispatch }) => {
  try {
    await axiosApi.patch(`/artists/${artistId}/togglePublished`, {});
    dispatch(fetchArtist());
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deleteArtist = createAsyncThunk<
  void,
  string,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>("artist/delete", async (artistId, { rejectWithValue, dispatch }) => {
  try {
    await axiosApi.delete(`/artists/${artistId}`);
    dispatch(fetchArtist());
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
