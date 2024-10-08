import express, {NextFunction, Response} from 'express';
import Track from '../Models/Track';
import {TrackMutation} from '../types';
import mongoose from 'mongoose';
import Album from '../Models/Album';
import {auth, RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import {publicGet, RequestUser} from '../middleware/public';


const trackRouter = express.Router();

trackRouter.get('/', publicGet, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const {album, artist} = req.query;
    const user = (req as RequestUser).user
    let tracks;

    const publishedFilter = user && user.role === 'admin' ? {} : { isPublished: true };

    if (artist) {
      const albums = await Album.find({artist: artist}).select('_id');
      const albumId = albums.map(album => album._id);
      tracks = await Track.find({album: {$in: albumId},...publishedFilter}).populate({
        path: 'album',
        populate: {path: 'artist', select: 'title'}
      }).sort({track_number: 1});
    } else if (album) {
      tracks = await Track.find({album: album,...publishedFilter}).populate({
        path: 'album',
        populate: {path: 'artist', select: 'title'},
        select: 'title artist created_at image',
      }).sort({track_number: 1});
    } else {
      tracks = await Track.find({...publishedFilter}).sort({track_number: 1})
    }

    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});




trackRouter.post('/', auth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const trackMutation: TrackMutation = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
      track_number: req.body.track_number
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


trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).send({error: 'track not found'});
    }

    track.isPublished = !track.isPublished;

    await track.save();
    res.send(track)
  } catch (e) {
    next(e)
  }
})

trackRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const track = Track.findById(id);
    if (!track) {
      return res.status(404).send({error: 'track not found'});
    }
    await Track.deleteOne({_id: id})

    return res.status(204).send();
  } catch (e) {
    next(e)
  }
})


export default trackRouter;