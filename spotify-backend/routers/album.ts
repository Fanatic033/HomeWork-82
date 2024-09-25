import express, {NextFunction, Request, Response} from 'express';
import Album from '../Models/Album';
import {AlbumMutation} from '../types';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';
import {auth, RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';


const albumRouter = express.Router();


albumRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {artist} = req.query;
    let albums;
    if (artist) {
      albums = await Album.find({artist: artist}).populate('artist', 'title image description').sort({created_at: -1})
    } else {
      albums = await Album.find();
    }
    return res.send(albums);
  } catch (e) {
    return next(e)
  }
})

albumRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'title description image');
    if (album === null) {
      return res.status(404).send({error: 'album not found'})
    }
    return res.send(album)
  } catch (e) {
    next(e)
  }
})

albumRouter.post('/', auth, imagesUpload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const albumData: AlbumMutation = {
      artist: req.body.artist,
      title: req.body.title,
      created_at: req.body.created_at,
      image: req.file ? req.file.filename : null,
    }
    const album = new Album(albumData);
    await album.save();
    return res.send(album)
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e)
    }
    return next(e)
  }
})


// albumRouter.patch('/id', permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
//   const {id} = req.params;
//   try {
//     const album = Album.findById(id);
//     if (!album) {
//       return res.status(404).send({error: 'album not found'});
//     }
//
//     album.isPublished = !album.isPublished;
//
//     await album.save()
//     res.send(album)
//   } catch (e) {
//     next(e)
//   }
// })

albumRouter.delete('/:id', auth,permit('admin') ,async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const album = Album.findById(id);
    if (!album) {
      return res.status(404).send({error: 'album not found'});
    }
    await Album.deleteOne({_id: id})

    return res.send(album)
  } catch (e) {
    next(e)
  }
})


export default albumRouter;