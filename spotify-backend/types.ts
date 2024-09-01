export type ArtistMutation = {
  title: string;
  description: string;
  image: string | null;
}

export type AlbumMutation = {
  artist: string;
  title: string;
  created_at: string;
  image: string | null;
}