import express from 'express';
import Album from '../Models/Album';
import {AlbumMutation} from '../types';
import mongoose from 'mongoose';
import {imagesUpload} from '../multer';


const albumRouter = express.Router();


albumRouter.get('/', async (req, res, next) => {
  try {
    const {artist} = req.query;
    let albums;
    if (artist) {
      albums = await Album.find({artist: artist}).populate('artist','title image description');
    } else {
      albums = await Album.find();
    }
    res.send(albums);
  } catch (e) {
    return next(e)
  }
})

albumRouter.get('/:id', async (req, res, next) => {
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

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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


export default albumRouter;