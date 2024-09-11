import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./app/store.ts";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline/>
            <StrictMode>
                <App/>
            </StrictMode>
        </BrowserRouter>
    </Provider>
)
