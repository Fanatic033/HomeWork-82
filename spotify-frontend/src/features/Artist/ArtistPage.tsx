import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectArtist, selectIsLoading } from "./ArtistSlice.ts";
import ArtistCard from "./components/ArtistCard.tsx";
import { useEffect } from "react";
import { fetchArtist } from "./ArtistThunks.ts";
import { Button, CircularProgress, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { selectUser } from "../User/UserSlice.ts";

const ArtistPage = () => {
  const artist = useAppSelector(selectArtist);
  const dispatch = useAppDispatch();
  const loader = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtist());
  }, [dispatch]);

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "white", marginLeft: "50px" }}>
          Популярные Исполнители
        </h2>
        {user && (
          <Button
            variant={"outlined"}
            sx={{ margin: "20px 70px" }}
            component={NavLink}
            to={"/new-artist"}
          >
            Add Artist
          </Button>
        )}
      </div>

      {artist.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", marginBottom: "20px" }}
          >
            Нет исполнителей
          </Typography>
          {user && (
            <Button
              variant={"contained"}
              color="primary"
              component={NavLink}
              to={"/new-artist"}
            >
              Создать исполнителя
            </Button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {artist.map((artist) => (
            <ArtistCard
              key={artist._id}
              id={artist._id}
              title={artist.title}
              image={artist.image}
              isPublished={artist.isPublished}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ArtistPage;
