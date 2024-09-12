import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtist, selectIsLoading} from './ArtistSlice.ts';
import ArtistCard from "./components/ArtistCard.tsx";
import {useEffect} from "react";
import {fetchArtist} from "./ArtistThunks.ts";
import {CircularProgress} from '@mui/material';

const ArtistPage = () => {
    const artist = useAppSelector(selectArtist);
    const dispatch = useAppDispatch();
    const loader = useAppSelector(selectIsLoading)

    useEffect(() => {
        dispatch(fetchArtist());
    },[dispatch])


  if(loader) {
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
      </div>
    );
  }
    return (
      <>
        <h2 style={{color:"white",marginLeft: '50px'}}>Популярные Исполнители</h2>
        <div style={{display: "flex"}}>
            {artist.map((artist) => (
                <ArtistCard
                    key={artist._id}
                    id={artist._id}
                    title={artist.title}
                    image={artist.image}
                />
            ))}
        </div>
      </>
    );
};

export default ArtistPage;