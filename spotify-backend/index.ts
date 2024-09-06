import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import artistRouter from './routers/artist';
import albumRouter from './routers/album';
import trackRouter from './routers/track';
import usersRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';

const app = express();
const port = 8000;
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistRouter)
app.use('/albums', albumRouter)
app.use('/tracks', trackRouter)
app.use('/users', usersRouter)
app.use('/track_history', trackHistoryRouter)


const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  })
}

run().catch(err => {
  console.log(err)
});