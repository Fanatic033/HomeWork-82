import mongoose from 'mongoose';
import config from './config';
import Artist from './Models/Artist';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums')
    await db.dropCollection('artists')
    await db.dropCollection('tracks')
    await db.dropCollection('track_history')
    await db.dropCollection('users')
  }catch(err) {
    console.log('skip drop...');
  }
  await Artist.create({
    title: "The Weeknd",
    description: "star",
  },{
    title: "V $ X V Prince",
    description: "kz",
    }
    );
}

run().catch(e => {console.log(e)})