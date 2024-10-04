import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { GlobalError, TrackHistory } from "../../types";
import { RootState } from "../../app/store.ts";

export const addTrackToHistory = createAsyncThunk<
  void,
  { track: string },
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>(
  "trackHistory/addTrackToHistory",
  async ({ track }, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;
      if (!token) {
        console.error("No user token found");
      }

      await axiosApi.post(
        "/track_history",
        { track },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const fetchHistoryTracks = createAsyncThunk<
  TrackHistory[],
  void,
  { state: RootState }
>("trackHistory/fetchHistoryTracks", async (_, { getState }) => {
  const token = getState().users.user?.token;
  if (!token) {
    throw new Error("No user token found");
  }
  let { data: trackHistory } = await axiosApi.get<TrackHistory[]>(
    "/track_history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (trackHistory.length === 0) {
    trackHistory = [];
  }
  return trackHistory;
});
