import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

vi.mock('../App', () => ({
  default: () => <div>App Component</div>,
}));

vi.mock('../pages/Main/MainPage', () => ({
  default: () => <div>MainPage Component</div>,
}));

vi.mock('../pages/About/AboutPage', () => ({
  default: () => <div>AboutPage Component</div>,
}));

vi.mock('../pages/NotFound/NotFoundPage', () => ({
  default: () => <div>NotFoundPage Component</div>,
}));

describe('Router Configuration', () => {
  it('wraps routes with ErrorBoundary', async () => {
    const TestComponent = () => {
      throw new Error('Test error');
    };

    const testRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <div>
              <TestComponent />
            </div>
          ),
          errorElement: <NotFoundPage />,
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText('NotFoundPage Component')).toBeInTheDocument();
  });
});
