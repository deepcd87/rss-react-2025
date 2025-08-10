import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonDetails from './PokemonDetails';
import type { Pokemon } from '../../@types/types';

const mockPokemon: Pokemon = {
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
};

describe('PokemonDetails Component', () => {
  it('renders pokemon details correctly', () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    expect(screen.getByText('PIKACHU')).toBeInTheDocument();

    const image = screen.getByAltText('pikachu');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'pikachu.png');

    const container = screen.getByTestId('pokemon-details');

    expect(container).toHaveTextContent('ID: 25');
    expect(container).toHaveTextContent('Types: electric');
    expect(container).toHaveTextContent('Abilities: static');
    expect(container).toHaveTextContent('Height: 4');
    expect(container).toHaveTextContent('Weight: 60');

    const statsSection = screen.getByText('Stats:').parentElement;
    expect(statsSection).toHaveTextContent('hp: 35');
    expect(statsSection).toHaveTextContent('attack: 55');
  });
});
