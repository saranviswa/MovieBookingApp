const React = require('react');
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import InitialPage from './InitialPage'
import SignUp from './SignUp'

// Mock the BrowserRouter's navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('App', () => {
  test('renders InitialPage when on "/" route', () => {
    render(
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialPage />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    );

    const initialPageText = screen.getByText('Sign in');
    expect(initialPageText).toBeInTheDocument();
  });

});
