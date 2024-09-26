import React, {useEffect, useState} from 'react';
import {CircularProgress, MenuItem, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {mutationAlbum} from '../../../types.ts';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {selectArtist, selectIsLoading} from '../../Artist/ArtistSlice.ts';
import {fetchArtist} from '../../Artist/ArtistThunks.ts';

interface Props {
  onSubmit: (album: mutationAlbum) => void;
  isLoading: boolean;
}

const styles = {
  formGroup: {
    marginBottom: '16px',
  }
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {

  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);
  const artistFetching = useAppSelector(selectIsLoading)


  const [state, setState] = useState<mutationAlbum>({
    artist: '',
    title: '',
    created_at: '',
    image: null,
  });

  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchArtist())
  }, []);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.image) {
      setImageError('Image is required');
      return;
    }

    setImageError(null)
    onSubmit({...state,});
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <form onSubmit={submitFormHandler} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '600px',
      margin: '100px auto',
      backgroundColor: '#ffffff',
      padding: '44px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      color: '#000',
    }}>
      <div style={styles.formGroup}>
        {artistFetching ? (
          <CircularProgress/>
        ) : (
          <TextField
            required
            select
            label="Artist"
            id="artist"
            name="artist"
            value={state.artist}
            onChange={inputHandler}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.title}
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
          type="text"
          label="Created_at"
          id="created_at"
          name="created_at"
          value={state.created_at}
          onChange={inputHandler}
          fullWidth
        />
      </div>
      <div style={styles.formGroup}>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler}/>
        {imageError && (
          <Typography color="error" variant="body2">
            {imageError}
          </Typography>
        )}
      </div>
      <div style={styles.formGroup}>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon/>}
          variant="contained"
          sx={{background: 'green'}}
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </form>
  );
};

export default ProductForm;