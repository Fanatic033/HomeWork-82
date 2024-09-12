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

}