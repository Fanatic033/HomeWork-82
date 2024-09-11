import './App.css'
import {Route, Routes} from "react-router-dom";
import ResponsiveAppBar from "./UI/AppToolBar.tsx";
import ArtistPage from "./features/Artist/ArtistPage.tsx";
import Typography from '@mui/material/Typography';

const App = () => (
    <>
        <header>
            <ResponsiveAppBar/>
        </header>
        <Routes>
            <Route path={'/'} element={<ArtistPage/>}/>
            <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
    </>
);

export default App
