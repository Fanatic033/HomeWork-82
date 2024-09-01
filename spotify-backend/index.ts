import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import artistRouter from './routers/artist';

const app = express();
const port = 8000;
app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistRouter)


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