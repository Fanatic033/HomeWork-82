import express from 'express';
import User from '../Models/User';
import Track from '../Models/Track';
import TrackHistory from '../Models/TrackHistory';
import mongoose from 'mongoose';


const trackHistoryRouter = express.Router();


trackHistoryRouter.post('/', async (req, res,) => {
  const headerValue = req.get('Authorization');
  console.log(headerValue);
  if (!headerValue) {
    return res.status(401).send({error: 'Authorization error'});
  }

  const [_bearer, token] = headerValue.split(' ');
  if (!token) {
    return res.status(401).send({error: 'Token not found'});
  }

  const user = await User.findOne({token});
  if (!user) {
    return res.status(401).send({error: 'Wrong Token'});
  }

  const {track} = req.body;
  if (!track) {
    return res.status(400).send({error: 'Track ID is required'});
  }
  if (!mongoose.Types.ObjectId.isValid(track)) {
    return res.status(400).send({error: 'Invalid Track ID format'});
  }

  const track_ID = await Track.findById(track)
  if (!track_ID) {
    return res.status(401).send({error: 'Track not found'});
  }

  const trackHistory = new TrackHistory({
    user: user._id,
    track: track_ID._id
  })

  await trackHistory.save()

  return res.send(trackHistory)
})


export default trackHistoryRouter;

