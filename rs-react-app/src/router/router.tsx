import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import About from '../pages/About/AboutPage';
import MainPage from '../pages/Main/MainPage';
import { ThemeProvider } from '../context/ThemeProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/about', element: <About /> },
    ],
  },
]);
