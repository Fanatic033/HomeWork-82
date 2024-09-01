import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = 8000;
app.use(express.json());


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