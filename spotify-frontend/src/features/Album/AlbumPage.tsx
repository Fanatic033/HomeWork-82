import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAlbums } from "./AlbumThunks.ts";
import AlbumCard from "./components/AlbumCard.tsx";
import Image from "@/assets/image-not-found.png";
import { selectAlbum, selectFetching } from "./AlbumSlice.ts";
import { API_URL } from "../../constants.ts";
import { Button, CardMedia, CircularProgress, Typography } from "@mui/material";
import { selectUser } from "../User/UserSlice.ts";

const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbum);
  const loader = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  let cardImage = Image;
  if (albums.length > 0 && albums[0]?.artist.image) {
    cardImage = `${API_URL}/${albums[0].artist.image}`;
  }

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
      {albums.length > 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              <CardMedia
                component="img"
                image={cardImage}
                alt="Artist"
                sx={{
                  width: "140px",
                  height: "145px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <h1
                style={{ color: "white", fontSize: "64px", marginLeft: "50px" }}
              >
                {albums[0].artist.title}
              </h1>
            </div>
            {user && (
              <Button
                variant={"outlined"}
                sx={{ margin: "20px 70px", height: "100%" }}
                component={NavLink}
                to={"/new-album"}
              >
                Add Album
              </Button>
            )}
          </div>
          <h2 style={{ color: "white", fontSize: "26px", marginLeft: "50px" }}>
            Альбомы
          </h2>
          <div style={{ display: "flex", gap: "25px", marginLeft: "70px" }}>
            {albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", marginBottom: "20px" }}
          >
            Нет альбомов
          </Typography>
          {user && (
            <Button
              variant={"contained"}
              color="primary"
              component={NavLink}
              to={"/new-album"}
            >
              Создать альбом
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default AlbumsPage;
