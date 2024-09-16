import express from 'express';
import Track from '../Models/Track';
import TrackHistory from '../Models/TrackHistory';
import mongoose from 'mongoose';
import {auth, RequestWithUser} from '../middleware/auth';
import Album from '../Models/Album';
import Artist from '../Models/Artist';


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

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res) => {
  try {
    const userId = req.user!._id;

    const trackHistories = await TrackHistory.find({ user: userId }).sort({ datetime: -1 });

    if (!trackHistories.length) {
      return res.send([])
    }

    const trackId = trackHistories.map(history => history.track);

    const tracks = await Track.find({ _id: { $in: trackId } });

    const result = await Promise.all(tracks.map(async (track) => {
      const album = await Album.findById(track.album);
      let artist = null;

      if (album) {
        artist = await Artist.findById(album.artist);
      }
      return {
        track_id: track._id,
        trackTitle: track.title,
        artist: artist ? {
          artistName: artist.title,
        } : null,
        listenedAt: trackHistories.find(history => history.track.toString() === track._id.toString())?.datetime
      };
    }));

    res.send(result);

    } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});


export default trackHistoryRouter;

