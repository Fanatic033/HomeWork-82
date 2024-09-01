import express from 'express';
import Track from '../Models/Track';
import {TrackMutation} from '../types';
import mongoose from 'mongoose';


const trackRouter = express.Router();

trackRouter.get('/', async (req: express.Request, res: express.Response, next) => {
  try {
    const {album} = req.query;
    let tracks;
    if (album) {
      tracks = await Track.find({album: album}).populate('album',);
    } else {
      tracks = await Track.find()
    }
    return res.send(tracks);
  } catch (e) {
    return next(e)
  }
});

trackRouter.post('/', async (req, res, next) => {
  try {
    const trackMutation: TrackMutation = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
    }
    const track = new Track(trackMutation);
    await track.save();
    return res.send(track)
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e)
    }
    next(e)
  }
})


export default trackRouter;