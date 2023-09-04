import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter,Routes,  Route } from 'react-router-dom';
import InitialPage from './InitialPage';
import Movies from './Movies';
import './App.css';
import SignUp from './SignUp';
import Admin from './admin';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<InitialPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
