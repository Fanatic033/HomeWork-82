import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectHistory} from './TrackHistorySlice.ts';
import {fetchHistoryTracks} from './TrackHistoryThunks.ts';
import {useEffect} from 'react';
import TrackHistoryCard from './component/TrackHistoryCard.tsx';

const TrackHistoryPage = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectHistory)

  useEffect(() => {
    dispatch(fetchHistoryTracks())
  }, [dispatch]);

  return (
    <>

      <h1 style={{color: "white", marginLeft: '50px'}}>История Прослушанных Песен</h1>

      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '80px'}}>
        {trackHistory.map((history) => (
          <TrackHistoryCard
            key={history.track_id}
            trackTitle={history.trackTitle}
            artist={history.artist}
            listenedAt={history.listenedAt}
          />
        ))
        }
      </div>
    </>
  );
};

export default TrackHistoryPage;