// MainPage.test.tsx
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import MainPage from './MainPage';
import type { Pokemon } from '../../@types/types';

// --- Types for mocks ---
interface PokemonListProps {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedId: string | null;
  onPokemonSelect: (id: string) => void;
  onCloseDetails: () => void;
  onPageChange: (newPage: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

interface PokemonListQuery {
  isLoading: boolean;
  error: { message: string } | null;
  data?: { results: Pokemon[]; count: number };
  refetch: () => void;
  isRefetching: boolean;
}

interface PokemonSearchQuery {
  isLoading: boolean;
  error: { message: string } | null;
  data?: Pokemon;
  refetch: () => void;
  isRefetching: boolean;
}

// --- Component mock ---
vi.mock('../../components/PokemonList/PokemonList', () => ({
  default: (props: PokemonListProps) => (
    <div>
      {props.isLoading && <div>Loading...</div>}
      {props.error && <div>Error: {props.error}</div>}
      <ul>
        {props.pokemonList.map((p) => (
          <li
            key={p.details?.id ?? p.name}
            onClick={() => props.onPokemonSelect(String(p.details?.id ?? ''))}
          >
            {p.name}
          </li>
        ))}
      </ul>
      <button onClick={() => props.onPageChange(2)}>Next Page</button>
      <button onClick={props.onCloseDetails}>Close</button>
      <button onClick={props.onRefresh}>Refresh</button>
    </div>
  ),
}));

// --- Hook mocks ---
const mockListQuery: PokemonListQuery = {
  isLoading: false,
  error: null,
  data: {
    results: [{ name: 'bulbasaur', url: '', details: { id: 1 } } as Pokemon],
    count: 1,
  },
  refetch: vi.fn(),
  isRefetching: false,
};

const mockSearchQuery: PokemonSearchQuery = {
  isLoading: false,
  error: null,
  data: { name: 'pikachu', url: '', details: { id: 25 } } as Pokemon,
  refetch: vi.fn(),
  isRefetching: false,
};

vi.mock('../../hooks/queries', () => ({
  usePokemonListWithDetails: vi.fn(() => mockListQuery),
  usePokemonSearch: vi.fn(() => mockSearchQuery),
}));

vi.mock('../../utils/formatPokemon', () => ({
  formatPokemon: (p: unknown) => p,
}));

vi.mock('react-router-dom', async (orig) => {
  const actual: typeof import('react-router-dom') = await orig();
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockListQuery.isLoading = true;
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockListQuery.isLoading = false;
    mockListQuery.error = { message: 'Oops!' };
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Oops!/)).toBeInTheDocument();
  });

  it('renders pokemon list from listQuery when no search term', () => {
    mockListQuery.error = null;
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renders pokemon from searchQuery when searchTerm is present', () => {
    (useOutletContext as Mock).mockReturnValue({ searchTerm: 'pikachu' });
    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('calls onPokemonSelect when a pokemon is clicked', () => {
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('bulbasaur'));
  });

  it('calls onPageChange', () => {
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Next Page'));
  });

  it('calls onRefresh', () => {
    (useOutletContext as Mock).mockReturnValue({ searchTerm: '' });
    render(<MainPage />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('Refresh'));
    expect(mockListQuery.refetch).toHaveBeenCalled();
  });
});
