import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAlbums} from './AlbumThunks.ts';
import AlbumCard from './components/AlbumCard.tsx';
import Image from '@/assets/image-not-found.png'
import {selectAlbum, selectFetching} from './AlbumSlice.ts';
import {API_URL} from '../../constants.ts';
import {CardMedia, CircularProgress} from '@mui/material';

const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const loader = useAppSelector(selectFetching)

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);
  let cardImage = Image;

  if(cardImage) {
    cardImage = `${API_URL}/${albums[0]?.artist.image}`
  }

  if(loader) {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
      </div>
    );
  }
  return (
    <>
      <div>
        {albums.length > 0 && (
          <div style={{display: 'flex',alignItems: 'center',marginLeft: '50px'}}>
            <CardMedia
              component="img"
              image={cardImage}
              alt="Artist"
              sx={{
                width: '140px',
                height: '145px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <h1 style={{color: 'white', fontSize: '64px', marginLeft: '50px'}}>{albums[0].artist.title}</h1>
          </div>
        )}
        <h2 style={{color: 'white', fontSize: '26px', marginLeft: '50px'}}>Альбомы</h2>
        <div style={{display: 'flex', gap: '25px',marginLeft: '70px' }}>
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default AlbumsPage;
