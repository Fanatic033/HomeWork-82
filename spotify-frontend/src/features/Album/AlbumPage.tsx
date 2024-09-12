import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchAlbums} from './AlbumThunks.ts';
import AlbumCard from './components/AlbumCard.tsx';
import {selectAlbum} from './AlbumSlice.ts';

const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <div>
        {albums.length > 0 && (
          <h1 style={{color: "white", fontSize: '64px', marginLeft: '50px'}}>{albums[0].artist.title}</h1>
        )}
        <h2 style={{color: "white", fontSize: '26px', marginLeft: '50px'}}>Альбомы</h2>
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
