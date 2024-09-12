import {Card, CardContent, Typography} from '@mui/material';
import {FC} from 'react';
import {TrackI} from '../../../types.ts';

interface Props {
  track: TrackI;
}

const TrackCard: FC<Props> = ({track}) => {
  return (
    <Card
      sx={{
        backgroundColor: '#2c2c2c',
        borderRadius: '8px',
        width: '600px',
        height: 'auto',
        padding: '8px',
        display: 'flex',
        boxShadow: 'none',
        margin: '8px 0',
      }}
    >
      <CardContent sx={{ padding: '0', display: 'flex', width: '100%', marginTop: '20px' }}>
        <div style={{ flex: '0 0 10%', textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 600,
            }}
          >
            {track.track_number}
          </Typography>
        </div>
        <div style={{ flex: '1', overflow: 'hidden' }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {track.title}
          </Typography>
        </div>
        <div style={{ flex: '0 0 20%',   }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontWeight: 400,
            }}
          >
            {track.duration}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
