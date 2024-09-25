import Artist from './Artist';
import mongoose, {Types} from 'mongoose';

const AlbumSchema = new  mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    }
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  }
})

const Album = mongoose.model('Album', AlbumSchema);

export default Album