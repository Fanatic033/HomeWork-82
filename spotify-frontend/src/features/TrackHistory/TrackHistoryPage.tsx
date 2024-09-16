import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectFetchingHistory, selectHistory} from './TrackHistorySlice.ts';
import {fetchHistoryTracks} from './TrackHistoryThunks.ts';
import {useEffect} from 'react';
import TrackHistoryCard from './component/TrackHistoryCard.tsx';
import {CircularProgress} from '@mui/material';

const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectHistory)
  const loading = useAppSelector(selectFetchingHistory)

  useEffect(() => {
    dispatch(fetchHistoryTracks())
  }, [dispatch]);


  if(loading){
    return (
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress color="success"/>
      </div>
    )
  }
  return (
    <>
      <h1 style={{color: 'white', marginLeft: '50px'}}>История Прослушанных Песен</h1>

      {trackHistory.length === 0 ? (
        <h2 style={{color: 'white', marginTop: '170px', textAlign:'center',}}>нет треков</h2>

      ): (
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '80px'}}>
        {trackHistory.map((history) => (
          <TrackHistoryCard
            key={history.track_id}
            trackTitle={history.trackTitle}
            artist={history.artist}
            listenedAt={history.listenedAt}
          />
        ))}
      </div>
        )}
    </>
  );
};

export default TrackHistoryPage;