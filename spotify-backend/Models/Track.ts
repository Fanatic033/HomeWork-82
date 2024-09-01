import mongoose, {Schema} from 'mongoose';

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  duration: String,
})

const Track = mongoose.model('Track', TrackSchema);

export default Track