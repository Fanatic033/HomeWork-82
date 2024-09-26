import {Navigate, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectUser} from '../User/UserSlice.ts';
import {mutationTrack} from '../../types.ts';
import {selectCreateFetching} from './TracksSlice.ts';
import TracksForm from './components/TracksForm.tsx';
import {createTrack} from './TracksThunks.ts';

const AddAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectCreateFetching)

  if (!user) {
    return <Navigate to="/"/>;
  }

  const onFormSubmit = async (track: mutationTrack) => {
    try {
      await dispatch(createTrack(track));
      navigate('/');
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <TracksForm onSubmit={onFormSubmit} isLoading={isLoading}/>
    </div>
  );
};

export default AddAlbum;