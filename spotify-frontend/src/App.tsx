import './App.css'
import {Routes} from "react-router-dom";
import ResponsiveAppBar from "./UI/AppToolBar.tsx";
import ArtistCard from "./features/Artist/components/ArtistCard.tsx";

const App = () => (
    <>
        <header>
            <ResponsiveAppBar/>
        </header>
        <Routes>

        </Routes>
        <ArtistCard/>
    </>
);

export default App
