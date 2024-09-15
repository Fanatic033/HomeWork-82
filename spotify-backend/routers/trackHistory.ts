import express from 'express';
import Track from '../Models/Track';
import TrackHistory from '../Models/TrackHistory';
import mongoose from 'mongoose';
import {auth, RequestWithUser} from '../middleware/auth';


const trackHistoryRouter = express.Router();


trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res,) => {

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
    user: req.user!._id,
    track: track_ID._id
  })

  await trackHistory.save()

  return res.send(trackHistory)
})


export default trackHistoryRouter;

