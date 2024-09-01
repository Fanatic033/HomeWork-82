import mongoose, {Schema} from 'mongoose';

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: String,
  },
  image: String,
})

const Album = mongoose.model('Album', AlbumSchema);

export default Album