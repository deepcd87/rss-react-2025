import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  const mockOnSearchSubmit = vi.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header onSearchSubmit={mockOnSearchSubmit} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('handles search input and submission', () => {
    render(
      <MemoryRouter>
        <Header onSearchSubmit={mockOnSearchSubmit} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(mockOnSearchSubmit).toHaveBeenCalledWith('pikachu');
  });

  it('triggers search on Enter key', () => {
    render(
      <MemoryRouter>
        <Header onSearchSubmit={mockOnSearchSubmit} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search Pokémon...');
    fireEvent.change(input, { target: { value: 'charizard' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSearchSubmit).toHaveBeenCalledWith('charizard');
  });

  it('persists search value in localStorage', () => {
    render(
      <MemoryRouter>
        <Header onSearchSubmit={mockOnSearchSubmit} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search Pokémon...');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(localStorage.getItem('searchValue')).toBe('bulbasaur');
  });
});
