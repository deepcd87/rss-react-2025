// import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Header from './Header';

// describe('Header Component', () => {
//   const mockOnSearchSubmit = vi.fn();

//   beforeEach(() => {
//     // Clear all mocks before each test
//     vi.clearAllMocks();
//   });

//   it('renders navigation links', () => {
//     render(
//       <MemoryRouter>
//         <Header onSearchSubmit={mockOnSearchSubmit} />
//       </MemoryRouter>
//     );

//     expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
//     expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
//   });

//   it('handles search input and submission', () => {
//     render(
//       <MemoryRouter>
//         <Header onSearchSubmit={mockOnSearchSubmit} />
//       </MemoryRouter>
//     );

//     const input = screen.getByPlaceholderText('Search Pokémon...');
//     const button = screen.getByRole('button', { name: 'Search' });

//     fireEvent.change(input, { target: { value: 'pikachu' } });
//     fireEvent.click(button);

//     expect(mockOnSearchSubmit).toHaveBeenCalledWith('pikachu');
//   });

//   it('triggers search on Enter key', () => {
//     render(
//       <MemoryRouter>
//         <Header onSearchSubmit={mockOnSearchSubmit} />
//       </MemoryRouter>
//     );

//     const input = screen.getByPlaceholderText('Search Pokémon...');
//     fireEvent.change(input, { target: { value: 'charizard' } });
//     fireEvent.keyDown(input, { key: 'Enter' });

//     expect(mockOnSearchSubmit).toHaveBeenCalledWith('charizard');
//   });

//   it('persists search value in localStorage', () => {
//     render(
//       <MemoryRouter>
//         <Header onSearchSubmit={mockOnSearchSubmit} />
//       </MemoryRouter>
//     );

//     const input = screen.getByPlaceholderText('Search Pokémon...');
//     fireEvent.change(input, { target: { value: 'bulbasaur' } });
//     fireEvent.keyDown(input, { key: 'Enter' });

//     expect(localStorage.getItem('searchValue')).toBe('bulbasaur');
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './Header';
import { useTheme } from '../../hooks/useTheme';
import useLocalStorage from '../../hooks/useLocalStorage';

vi.mock('../../hooks/useTheme');
vi.mock('../../hooks/useLocalStorage');
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Header Component', () => {
  const mockOnSearchSubmit = vi.fn();
  const mockToggleTheme = vi.fn();
  const mockSetSearchValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const localStorageMock = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      clear: vi.fn(),
    };
    vi.stubGlobal('localStorage', localStorageMock);

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    vi.mocked(useLocalStorage).mockReturnValue([
      'initial value',
      mockSetSearchValue,
    ]);
  });

  it('renders navigation links correctly', () => {
    render(<Header onSearchSubmit={mockOnSearchSubmit} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders search input and button', () => {
    render(<Header onSearchSubmit={mockOnSearchSubmit} />);

    expect(
      screen.getByPlaceholderText('Search Pokémon...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders theme toggle button with correct initial text', () => {
    render(<Header onSearchSubmit={mockOnSearchSubmit} />);

    const themeButton = screen.getByRole('button', { name: 'Dark Theme' });
    expect(themeButton).toBeInTheDocument();
  });

  it('calls onSearchSubmit with trimmed value when search button is clicked', () => {
    const testValue = '  Pikachu  ';
    vi.mocked(useLocalStorage).mockReturnValue([testValue, mockSetSearchValue]);

    render(<Header onSearchSubmit={mockOnSearchSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockOnSearchSubmit).toHaveBeenCalledWith('pikachu');
    expect(localStorage.setItem).toHaveBeenCalledWith('searchValue', 'pikachu');
  });

  it('calls onSearchSubmit when Enter key is pressed', () => {
    const testValue = 'Charizard';
    vi.mocked(useLocalStorage).mockReturnValue([testValue, mockSetSearchValue]);

    render(<Header onSearchSubmit={mockOnSearchSubmit} />);
    const input = screen.getByPlaceholderText('Search Pokémon...');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnSearchSubmit).toHaveBeenCalledWith('charizard');
  });

  it('updates search value on input change', () => {
    render(<Header onSearchSubmit={mockOnSearchSubmit} />);
    const input = screen.getByPlaceholderText('Search Pokémon...');

    fireEvent.change(input, { target: { value: 'Bulbasaur' } });
    expect(mockSetSearchValue).toHaveBeenCalledWith('Bulbasaur');
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Header onSearchSubmit={mockOnSearchSubmit} />);

    const themeButton = screen.getByRole('button', { name: 'Dark Theme' });
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('changes theme button text based on current theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    const { rerender } = render(<Header onSearchSubmit={mockOnSearchSubmit} />);
    expect(
      screen.getByRole('button', { name: 'Dark Theme' })
    ).toBeInTheDocument();

    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });
    rerender(<Header onSearchSubmit={mockOnSearchSubmit} />);
    expect(
      screen.getByRole('button', { name: 'Light Theme' })
    ).toBeInTheDocument();
  });
});
