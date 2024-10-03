import mongoose, {Model} from 'mongoose';

export type ArtistMutation = {
  title: string;
  description: string;
  image: string | null;
}

export type AlbumMutation = {
  artist: string;
  title: string;
  created_at: number;
  image: string | null;
}

export type TrackMutation = {
  album: string;
  title: string;
  duration: string;
  track_number: number;
}



export interface UserFields {
  username: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleID?: string;
  avatar?: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;

  generateToken(): void
}

export type UserModel = Model<UserFields, {}, UserMethods>

export interface TrackHistoryFields {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId;
  datetime: Date;
}