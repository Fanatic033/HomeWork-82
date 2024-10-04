import express from 'express';
import {Error} from 'mongoose';
import User from '../Models/User';
import {auth, RequestWithUser} from '../middleware/auth';
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import {imagesUpload} from '../multer';


const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);


usersRouter.post('/', imagesUpload.single('avatar'), async (req, res, next) => {

  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }

});


usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return res.status(400).send({error: 'User not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({error: 'wrong password'});
    }

    user.generateToken()
    await user.save()

    res.send(user)
  } catch (e) {
    return next(e);
  }
})

usersRouter.delete('/sessions', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
})

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({error: 'Google Login Error!'});
    }
    const email = payload.email;
    if (!email) {
      return res.status(400).send({error: 'Not enough user data to continue!'});
    }
    const gId = payload.sub;
    const avatar = payload.picture;
    const displayName = payload.name;
    let user = await User.findOne({googleID: gId});
    if (!user) {
      const newPassword = crypto.randomUUID();
      user = new User({
        username: email,
        password: newPassword,
        googleId: gId,
        displayName,
        avatar,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({message: 'Login with Google successful!', user});
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;

