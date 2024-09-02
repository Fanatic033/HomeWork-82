import express from 'express';
import Track from '../Models/Track';
import {TrackMutation} from '../types';
import mongoose from 'mongoose';
import Album from '../Models/Album';


const trackRouter = express.Router();

trackRouter.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const {album, artist} = req.query;
    let tracks;

    if (artist) {
      const albums = await Album.find({artist: artist}).select('_id');
      const albumId = albums.map(album => album._id);
      tracks = await Track.find({album: {$in: albumId}}).populate({
        path: 'album',
        populate: {path: 'artist', select: 'title'}
      });
    } else if (album) {
      tracks = await Track.find({album: album}).populate('album');
    } else {
      tracks = await Track.find().populate('album');
    }

    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

trackRouter.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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