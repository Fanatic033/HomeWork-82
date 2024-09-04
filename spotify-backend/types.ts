import {Model} from 'mongoose';

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

export type TrackMutation = {
  album: string;
  title: string;
  duration: string;
}



export interface UserFields {
  username: string;
  password: string;
  token: string
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;

  generateToken(): void
}

export type UserModel = Model<UserFields, {}, UserMethods>