import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Image from "@/assets/image-not-found.png";
import { AlbumI } from "../../../types.ts";
import React, { FC, useCallback, memo } from "react";
import { API_URL } from "../../../constants.ts";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../User/UserSlice.ts";
import { deleteAlbum, fetchAlbums, patchAlbum } from "../AlbumThunks.ts";

interface AlbumCardProps {
  album: AlbumI;
}

const AlbumCard: FC<AlbumCardProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  let cardImage = Image;

  if (cardImage) {
    cardImage = `${API_URL}/${album.image}`;
  }
  const year = album.created_at;
  const formattedDate = dayjs(`${year}-01-01`).format("YYYY");

  const deleteOneAlbum = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      await dispatch(deleteAlbum(album._id)).unwrap();
      dispatch(fetchAlbums(album.artist._id));
    },
    [dispatch, album._id, album.artist._id],
  );

  const patchOneAlbum = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      await dispatch(patchAlbum(album._id));
      await dispatch(fetchAlbums(album.artist._id));
    },
    [dispatch, album._id, album.artist._id],
  );

  return (
    <Card
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        width: 215,
        height: "100%",
        padding: 1,
        textAlign: "center",
        boxShadow: "none",
        margin: "0px 0px",
        textDecoration: "none",
      }}
      component={Link}
      to={`/tracks/${album._id}`}
    >
      {user?.role === "admin" && !album.isPublished && (
        <Typography
          variant="caption"
          sx={{
            color: "red",
            fontWeight: 400,
          }}
        >
          Неопубликовано
        </Typography>
      )}
      <CardMedia
        component="img"
        image={cardImage}
        alt="Artist"
        sx={{
          width: "200px",
          height: "205px",
          borderRadius: "10%",
          margin: "0px auto",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ padding: "0px 70px 0px 0px" }}>
        <Typography
          variant="subtitle1"
          component="strong"
          sx={{
            marginTop: "10px",
            color: "white",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {album.title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color: "gray",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          {formattedDate}
        </Typography>
      </CardContent>
      {user?.role === "admin" && (
        <>
          {album.isPublished ? (
            <Button
              variant="outlined"
              sx={{ color: "red", borderColor: "red", marginTop: "auto" }}
              onClick={deleteOneAlbum}
            >
              Удалить
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "green", borderColor: "green", marginTop: "auto" }}
              onClick={patchOneAlbum}
            >
              Опубликовать
            </Button>
          )}
        </>
      )}
    </Card>
  );
};

export default memo(AlbumCard);
