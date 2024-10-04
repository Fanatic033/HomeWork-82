import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectTrackFetching, selectTracks } from "./TracksSlice.ts";
import { useEffect } from "react";
import { fetchTracks } from "./TracksThunks.ts";
import TrackCard from "./components/TracksCard.tsx";
import { Button, CircularProgress, Typography } from "@mui/material";
import { selectUser } from "../User/UserSlice.ts";

const TracksPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loader = useAppSelector(selectTrackFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

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
      {tracks.length > 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "50px" }}>
              <h1 style={{ color: "white" }}>{tracks[0].album.artist.title}</h1>
              <h2 style={{ color: "white" }}>{tracks[0].album.title}</h2>
            </div>
            {user && (
              <Button
                variant={"outlined"}
                sx={{ margin: "20px 70px", height: "100%" }}
                component={NavLink}
                to={"/new-track"}
              >
                Add Track
              </Button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {tracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", marginBottom: "20px" }}
          >
            Нет треков
          </Typography>
          {user && (
            <Button
              variant={"contained"}
              color="primary"
              component={NavLink}
              to={"/new-track"}
            >
              Создать трек
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default TracksPage;
