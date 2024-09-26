import React, {useState} from 'react';
import {TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {mutationArtist} from '../../../types.ts';

interface Props {
  onSubmit: (artist: mutationArtist) => void;
  isLoading: boolean;
}

const styles = {
  formGroup: {
    marginBottom: '16px',
  }
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {


  const [state, setState] = useState<mutationArtist>({
    title: '',
    description: '',
    image: '',
  });

  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);


  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.description) {
      setDescriptionError('Description is required');
      return;
    }
    if (!state.image) {
      setImageError('Image is required');
      return;
    }
    setImageError(null)
    setDescriptionError(null);
    onSubmit({...state,});
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      maxWidth: '700px',
      margin: '100px auto',
      backgroundColor: '#ffffff',
      padding: '44px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      color: '#000',
    }}>
      <h3>Add new Artist</h3>
      <div style={styles.formGroup}>
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          fullWidth
        />
      </div>
      <div style={styles.formGroup}>
        <TextField
          required
          type="text"
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
          fullWidth
        />
        {descriptionError && (
          <Typography color="error" variant="body2">
            {descriptionError}
          </Typography>
        )}
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
          sx={{backgroundColor:'green'}}
        >
          <span>Save</span>
        </LoadingButton>
      </div>
    </form>
  );
};

export default ProductForm;