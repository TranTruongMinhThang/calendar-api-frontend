import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
    <GoogleOAuthProvider clientId='377969664032-g5frbhvh699le30vnsdl6l5c0sbbv42c.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  
);


