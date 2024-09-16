export interface ArtistI {
    _id: string;
    title: string;
    image: string;
}

export interface AlbumI {
  _id: string;
  artist: {
    _id: string;
    title: string;
    description: string;
    image: string | null;
  }
  title: string;
  created_at: number;
  image: string | null;
}

export interface TrackI {
_id: string;
album: {
  _id: string;
  title: string;
  created_at: number;
  image: string | null;
  artist: {
    _id: string;
    title: string;
  }
}
title: string;
duration: string;
track_number: number;
}


export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface TrackHistory {
  track_id: string,
  trackTitle: string;
  artist: {
    artistName: string;
  },
  listenedAt: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}


export interface GlobalError  {
  error: string;
}