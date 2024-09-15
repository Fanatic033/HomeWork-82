import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectTrackFetching, selectTracks} from './TracksSlice.ts';
import {useEffect} from 'react';
import {fetchTracks} from './TracksThunks.ts';
import TrackCard from './components/TracksCard.tsx';
import {CircularProgress} from '@mui/material';

const TracksPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loader = useAppSelector(selectTrackFetching)

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id))
    }
  }, [dispatch, id]);


  if (loader) {
    return (
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress color="success"/>
      </div>
    );
  }
  return (
    <>
      {tracks.length > 0 && (
        <div style={{marginLeft: '50px'}}>
          <h1 style={{color: 'white'}}>{tracks[0].album.artist.title}</h1>
          <h2 style={{color: 'white'}}>
            {tracks[0].album.title}
          </h2>
        </div>
      )}
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        {tracks.map(track => (
          <TrackCard key={track._id} track={track} />
        ))}
      </div>
    </>
  );
};

export default TracksPage;