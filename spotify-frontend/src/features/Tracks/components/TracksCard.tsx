import { Button, Card, CardContent, Typography } from "@mui/material";
import { FC, useCallback, memo } from "react";
import { TrackI } from "../../../types.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../User/UserSlice.ts";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { addTrackToHistory } from "../../TrackHistory/TrackHistoryThunks.ts";
import { deleteTrack, fetchTracks, patchTrack } from "../TracksThunks.ts";

interface Props {
  track: TrackI;
}

const TrackCard: FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleClick = useCallback(() => {
    if (user) {
      dispatch(addTrackToHistory({ track: track._id }));
    }
  }, [user, track._id, dispatch]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteTrack(track._id));
    await dispatch(fetchTracks(track.album._id));
  }, [dispatch, track._id, track.album._id]);

  const handlePatch = useCallback(async () => {
    await dispatch(patchTrack(track._id));
    await dispatch(fetchTracks(track.album._id));
  }, [dispatch, track._id, track.album._id]);

  return (
    <Card
      sx={{
        backgroundColor: "#2c2c2c",
        borderRadius: "8px",
        width: "600px",
        height: "auto",
        padding: "8px",
        display: "flex",
        boxShadow: "none",
        margin: "8px 0",
      }}
    >
      <CardContent
        sx={{ padding: "0", display: "flex", width: "100%", marginTop: "20px" }}
      >
        <div style={{ flex: "0 0 10%", textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: 600,
            }}
          >
            {track.track_number}
          </Typography>
        </div>
        <div style={{ flex: "1", overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {track.title}
          </Typography>
          {user?.role === "admin" && !track.isPublished && (
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
        </div>
        <div style={{ flex: "0 0 20%" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: 400,
            }}
          >
            {track.duration}
          </Typography>
        </div>
        {user ? (
          <Button onClick={handleClick}>
            <PlayCircleOutlineOutlinedIcon
              sx={{ color: "green", fontSize: "32px" }}
            />
          </Button>
        ) : (
          <p style={{ display: "none" }}></p>
        )}
        {user?.role === "admin" && (
          <>
            {track.isPublished ? (
              <Button
                variant="outlined"
                sx={{ color: "red", borderColor: "red", marginTop: "auto" }}
                onClick={handleDelete}
              >
                Удалить
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{ color: "green", borderColor: "green", marginTop: "auto" }}
                onClick={handlePatch}
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

export default memo(TrackCard);
