import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtist} from "./ArtistSlice.ts";
import ArtistCard from "./components/ArtistCard.tsx";
import {useEffect} from "react";
import {fetchArtist} from "./ArtistThunks.ts";

const ArtistPage = () => {

    const artist = useAppSelector(selectArtist);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArtist());
    },[dispatch])

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