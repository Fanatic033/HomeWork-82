import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {persistor, store} from './app/store.ts';
import {CssBaseline} from '@mui/material';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants';
addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <CssBaseline/>
        <App/>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
