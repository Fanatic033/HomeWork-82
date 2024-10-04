import mongoose from 'mongoose';
import config from './config';
import Artist from './Models/Artist';
import Album from './Models/Album';
import Track from './Models/Track';
import User from './Models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users')
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [weekendArtist, vsxPrinceArtist, imagineDragons] = await Artist.create({
    title: 'The Weeknd',
    image: 'fixtures/TheWEEKND.jpg',
    description: 'Canadian singer, songwriter, and record producer.',
    isPublished: true,
  }, {
    title: 'V $ X V PRiNCE',
    image: 'fixtures/prince.jpg',
    description: 'Unique artist from KZ.',
    isPublished: true,
  }, {
    title: 'Imagine Dragons',
    image: 'fixtures/imagine.webp',
    description: 'ROCK Group',
    isPublished: false,
  });

  const [weekendAlbum1, weekendAlbum2] = await Album.create({
    artist: weekendArtist._id,
    title: 'After Hours',
    created_at: 2020,
    image: 'fixtures/afterhours.jpg',
    isPublished: true,
  }, {
    artist: weekendArtist._id,
    title: 'Starboy',
    created_at: 2016,
    image: 'fixtures/starboy.jpg',
    isPublished: true,
  });

  const [vsxPrinceAlbum1, vsxPrinceAlbum2] = await Album.create({
    artist: vsxPrinceArtist._id,
    title: 'NOVЫЙ',
    created_at: 2022,
    image: 'fixtures/novyi.jpg',
    isPublished: true,
  }, {
    artist: vsxPrinceArtist._id,
    title: '30',
    created_at: 2020,
    image: 'fixtures/30.jpg',
    isPublished: true,
  });

  const imagineAlbum = await Album.create({
    artist: imagineDragons._id,
    title: 'Evolve',
    created_at: 2017,
    image: 'fixtures/evolve.jpeg',
    isPublished: false,
  })

  await Track.create({
    album: weekendAlbum1._id,
    title: 'Blinding Lights',
    duration: '3:20',
    track_number: 1,
    isPublished: true,
  }, {
    album: weekendAlbum1._id,
    title: 'In Your Eyes',
    duration: '3:58',
    track_number: 2,
    isPublished: true,

  }, {
    album: weekendAlbum1._id,
    title: 'Save Your Tears',
    duration: '3:35',
    track_number: 3,
    isPublished: true,
  }, {
    album: weekendAlbum1._id,
    title: 'Heartless',
    duration: '3:20',
    track_number: 4,
    isPublished: true,
  }, {
    album: weekendAlbum1._id,
    title: 'After Hours',
    duration: '3:43',
    track_number: 5,
    isPublished: true,
  });

  await Track.create({
    album: weekendAlbum2._id,
    title: 'Starboy',
    duration: '3:50',
    track_number: 1,
    isPublished: true,
  }, {
    album: weekendAlbum2._id,
    title: 'Party Monster',
    duration: '3:13',
    track_number: 2,
    isPublished: true,
  }, {
    album: weekendAlbum2._id,
    title: 'I Feel It Coming',
    duration: '4:00',
    track_number: 3,
    isPublished: true,
  }, {
    album: weekendAlbum2._id,
    title: 'Reminder',
    duration: '3:53',
    track_number: 4,
    isPublished: true,
  }, {
    album: weekendAlbum2._id,
    title: 'Sidewalks',
    duration: '3:58',
    track_number: 5,
    isPublished: true,
  });

  await Track.create({
    album: vsxPrinceAlbum1._id,
    title: 'Я так хотел',
    duration: '3:15',
    track_number: 1,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum1._id,
    title: '30',
    duration: '3:45',
    track_number: 2,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum1._id,
    title: 'Суета',
    duration: '4:00',
    track_number: 3,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum1._id,
    title: 'Краски',
    duration: '3:50',
    track_number: 4,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum1._id,
    title: 'Мой брат',
    duration: '3:25',
    track_number: 5,
    isPublished: true,
  });

  await Track.create({
    album: vsxPrinceAlbum2._id,
    title: 'Tokyo',
    duration: '3:40',
    track_number: 1,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum2._id,
    title: 'Дом 50',
    duration: '3:30',
    track_number: 2,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum2._id,
    title: 'Су',
    duration: '4:05',
    track_number: 3,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum2._id,
    title: 'Мурашки',
    duration: '3:55',
    track_number: 4,
    isPublished: true,
  }, {
    album: vsxPrinceAlbum2._id,
    title: 'на Пятом',
    duration: '3:50',
    track_number: 5,
    isPublished: true,
  });

  await Track.create({
    album: imagineAlbum,
    title: 'Believer',
    duration: '3:40',
    track_number: 1,
    isPublished: false,
  }, {
    album: imagineAlbum._id,
    title: 'I dont Know Why',
    duration: '3:50',
    track_number: 2,
    isPublished: false,
  }, {
    album: imagineAlbum,
    title: 'Rise up',
    duration: '3:10',
    track_number: 3,
    isPublished: false,
  })


  await User.create({
      username: 'user1',
      password: 'user1',
      displayName: 'user1',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      username: 'admin1',
      password: 'admin1',
      displayName: 'admin1',
      token: crypto.randomUUID(),
      role: 'admin',
    }
  );

  await db.close();
};

run().catch(console.error);
