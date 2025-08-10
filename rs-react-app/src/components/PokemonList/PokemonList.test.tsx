import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonList from './PokemonList';
import type { ResultsProps } from '../../@types/types';

const mockProps: ResultsProps = {
  pokemonList: [
    {
      name: 'pikachu',
      url: 'http://someurl.com',
      details: {
        id: 25,
        sprites: { front_default: 'pikachu.png' },
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        height: 4,
        weight: 60,
        stats: [
          {
            stat: { name: 'hp', url: 'http://someurl.com' },
            base_stat: 35,
            effort: 0,
          },
          {
            stat: { name: 'attack', url: 'http://someurl.com' },
            base_stat: 55,
            effort: 0,
          },
        ],
      },
    },
  ],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  selectedId: null,
  onPokemonSelect: vi.fn(),
  onCloseDetails: vi.fn(),
  onPageChange: vi.fn(),
};

describe('PokemonList Component', () => {
  it('renders pokemon list correctly', () => {
    render(<PokemonList {...mockProps} />);

    expect(screen.getByText('PIKACHU')).toBeInTheDocument();
    expect(screen.getByText('id: 25')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<PokemonList {...mockProps} isLoading={true} />);
    expect(screen.getByText('Loading Pokémon...')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<PokemonList {...mockProps} error="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('handles pokemon selection', () => {
    render(<PokemonList {...mockProps} />);
    fireEvent.click(screen.getByText('PIKACHU'));
    expect(mockProps.onPokemonSelect).toHaveBeenCalledWith('25');
  });
});
