import express, {NextFunction, Response} from 'express';
import Artist from '../Models/Artist';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';
import permit from '../middleware/permit';
import {publicGet, RequestUser} from '../middleware/public';
import {auth, RequestWithUser} from '../middleware/auth';

const artistRouter = express.Router();

artistRouter.get('/', publicGet, async (req: RequestUser, res: Response, next: NextFunction) => {
  try {
    const artists = req.user && req.user.role === 'admin'
      ? await Artist.find()
      : await Artist.find({isPublished: true});

    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});


artistRouter.post('/', auth, imagesUpload.single('image'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send({error: 'artist not found'});
    }
    await Artist.updateOne(
      { _id: req.params.id },
      { $set: { isPublished: !artist.isPublished } }
    );

    const updatedArtist = await Artist.findById(req.params.id);
    return res.send(updatedArtist);
  } catch (e) {
    next(e)
  }
})

artistRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const artist = Artist.findById(id);
    if (!artist) {
      return res.status(404).send({error: 'artist not found'});
    }
    await Artist.deleteOne({_id: id})

    return res.status(204).send()
  } catch (e) {
    next(e)
  }
})


export default artistRouter;