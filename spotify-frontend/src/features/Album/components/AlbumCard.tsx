import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Image from '@/assets/image-not-found.png'
import {AlbumI} from '../../../types.ts';
import {FC} from 'react';
import {API_URL} from '../../../constants.ts';
import  dayjs from 'dayjs';

interface AlbumCardProps {
  album: AlbumI;
}

const AlbumCard: FC<AlbumCardProps> = ({album}) => {
  let cardImage = Image;

  if(cardImage) {
    cardImage = `${API_URL}/${album.image}`
  }
  const year = album.created_at;
  const formattedDate = dayjs(`${year}-01-01`).format('YYYY');
  return (
      <Card
        sx={{
          backgroundColor: '#111212',
          borderRadius: '12px',
          width: 215,
          height: 268,
          padding: 1,
          textAlign: 'center',
          boxShadow: 'none',
          margin: '0px 0px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        component={Link}
        to={`/tracks/${album._id}`}
      >
        <CardMedia
          component="img"
          image={cardImage}
          alt="Artist"
          sx={{
            width: '200px',
            height: '205px',
            borderRadius: '10%',
            margin: '0px auto',
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ padding: '0px 70px 0px 0px' }}>
          <Typography
            variant="subtitle1"
            component="strong"
            sx={{
              marginTop: '10px',
              color: 'white',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {album.title}
          </Typography>  <Typography
            variant="subtitle1"
            component="p"
            sx={{
              color: 'gray',
              fontWeight: 500,
              fontSize: 15,
            }}
          >
          {formattedDate}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default AlbumCard;