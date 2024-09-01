import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  description: String,
})

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;