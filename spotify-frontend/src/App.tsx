import './App.css'
import {Route, Routes} from 'react-router-dom';
import ResponsiveAppBar from './UI/AppToolBar/AppToolBar.tsx';
import ArtistPage from './features/Artist/ArtistPage.tsx';
import Typography from '@mui/material/Typography';
import AlbumsPage from './features/Album/AlbumPage.tsx';
import TracksPage from './features/Tracks/TracksPage.tsx';
import Register from './features/User/Register.tsx';
import Login from './features/User/Login.tsx';
import TrackHistoryPage from './features/TrackHistory/TrackHistoryPage.tsx';

const App = () => (
  <>
    <header>
      <ResponsiveAppBar/>
    </header>
    <Routes>
      <Route path={'/'} element={<ArtistPage/>}/>
      <Route path="/albums/:id" element={<AlbumsPage/>}/>
      <Route path="/tracks/:id" element={<TracksPage/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'track-history'} element={<TrackHistoryPage/>}/>
      <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
    </Routes>
  </>
);

export default App
