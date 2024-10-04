export interface ArtistI {
  _id: string;
  title: string;
  image: string;
  description: string;
  isPublished: boolean;
}

export interface mutationArtist {
  title: string;
  image: string;
  description: string;
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
  isPublished: boolean;
}

export interface mutationAlbum {
  artist: string;
  title: string;
  created_at: string;
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
  isPublished: boolean;
}

export interface mutationTrack {
  album: string;
  title: string;
  duration: string;
  track_number: string,
}


export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  token: string;
  role: string;
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


export interface GlobalError {
  error: string;
}