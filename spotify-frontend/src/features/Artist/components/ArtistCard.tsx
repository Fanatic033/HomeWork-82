import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import * as React from 'react';
import imageNotFound from '@/assets/image-not-found.png';
import {API_URL} from '../../../constants.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../User/UserSlice.ts';
import {deleteArtist, patchArtist} from '../ArtistThunks.ts';

interface Props {
  title: string;
  image: string;
  id: string;
  isPublished: boolean;
}

const ArtistCard: React.FC<Props> = ({title, image, id, isPublished}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cardImage = image ? `${API_URL}/${image}` : imageNotFound;

  const handleDelete =  (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(deleteArtist(id));
  };

  const handlePublish = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(patchArtist(id))
  };

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        width: 215,
        height: '100%',
        padding: 1,
        textAlign: 'center',
        boxShadow: 'none',
        margin: '30px 25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration:'none'
      }}
      component={Link}
      to={`albums/${id}`}
    >
      {user?.role === 'admin' && !isPublished && (
        <Typography
          variant="caption"
          sx={{color: 'red', fontWeight: 400}}
        >
          Неопубликовано
        </Typography>
      )}
      <CardMedia
        component="img"
        image={cardImage}
        alt="Artist"
        sx={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          margin: '10px auto 0px',
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          padding: '13px 8px 1px 8px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{color: 'white', fontWeight: 500, fontSize: 16, marginBottom: '8px'}}
        >
          {title}
        </Typography>
        {user?.role === 'admin' && (
          <>
            {isPublished ? (
              <Button
                variant="outlined"
                sx={{color: 'red', borderColor: 'red', marginTop: 'auto'}}
                onClick={handleDelete}
              >Удалить
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{color: 'green', borderColor: 'green', marginTop: 'auto',}}
                onClick={handlePublish}
              >
                Опубликовать
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
