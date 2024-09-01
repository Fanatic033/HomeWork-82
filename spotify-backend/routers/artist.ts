import express from 'express';
import Artist from '../Models/Artist';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';

const artistRouter = express.Router();

artistRouter.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const artists = await Artist.find()
    return res.send(artists)
  } catch (e) {
    return next(e)
  }
})

artistRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const artistData: ArtistMutation = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    }
    const artist = new Artist(artistData);
    await artist.save();
    return res.send(artist)
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e)
    }
    return next(e)
  }
})

export default artistRouter;