import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFoundPage Component', () => {
  it('renders 404 message correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Pokémon Not Found!')).toBeInTheDocument();
    expect(screen.getByText(/scared Rattata/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to Pokémon Home' })
    ).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Go to Pokémon Home' });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
