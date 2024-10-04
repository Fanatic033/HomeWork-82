import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

interface Props {
  trackTitle: string;
  artist: {
    artistName: string;
  };
  listenedAt: string;
}

const TrackCard: React.FC<Props> = ({ trackTitle, artist, listenedAt }) => {
  dayjs.extend(LocalizedFormat);
  const date = dayjs(listenedAt).format("llll");

  return (
    <Card
      sx={{
        backgroundColor: "#2c2c2c",
        borderRadius: "8px",
        width: "800px",
        height: "auto",
        padding: "8px",
        display: "flex",
        boxShadow: "none",
        margin: "8px auto",
      }}
    >
      <CardContent
        sx={{
          padding: "0",
          display: "flex",
          width: "100%",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "0 0 14%", textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "white",
              fontWeight: 600,
            }}
          >
            {artist.artistName}
          </Typography>
        </div>
        <div style={{ flex: "1", overflow: "hidden" }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "white",
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {trackTitle}
          </Typography>
        </div>
        <div style={{ flex: "0 0 20%" }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "white",
              fontWeight: 400,
            }}
          >
            {date}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
