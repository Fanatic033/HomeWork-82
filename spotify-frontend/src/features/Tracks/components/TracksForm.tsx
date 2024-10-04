import React, { useEffect, useState } from "react";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { mutationTrack } from "../../../types.ts";
import { fetchArtist } from "../../Artist/ArtistThunks.ts";
import { selectAlbum, selectFetching } from "../../Album/AlbumSlice.ts";

interface Props {
  onSubmit: (track: mutationTrack) => void;
  isLoading: boolean;
}

const styles = {
  formGroup: {
    marginBottom: "16px",
  },
};

const ProductForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const albumFetching = useAppSelector(selectFetching);

  const [state, setState] = useState<mutationTrack>({
    album: "",
    title: "",
    duration: "",
    track_number: "",
  });

  useEffect(() => {
    dispatch(fetchArtist());
  }, []);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={submitFormHandler}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        margin: "100px auto",
        backgroundColor: "#ffffff",
        padding: "44px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        color: "#000",
      }}
    >
      <div style={styles.formGroup}>
        {albumFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Album"
            id="album"
            name="album"
            value={state.album}
            onChange={inputHandler}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </div>
      <div style={styles.formGroup}>
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputHandler}
          fullWidth
        />
      </div>
      <div style={styles.formGroup}>
        <TextField
          required
          type="number"
          label="Track_number"
          id="track_number"
          name="track_number"
          value={state.track_number}
          onChange={inputHandler}
          fullWidth
        />
      </div>
      <div style={styles.formGroup}>
        <TextField
          required
          type="text"
          label="Duration"
          id="duration"
          name="duration"
          value={state.duration}
          onChange={inputHandler}
          fullWidth
        />
      </div>
      <div style={styles.formGroup}>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ background: "green" }}
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </form>
  );
};

export default ProductForm;
