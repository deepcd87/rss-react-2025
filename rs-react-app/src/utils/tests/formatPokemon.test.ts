import { describe, it, expect } from 'vitest';
import { formatPokemon } from '../formatPokemon';
import type { RawPokemonData, Pokemon } from '../../@types/types';

describe('formatPokemon', () => {
  it('should correctly format raw Pokemon data', () => {
    const rawData: RawPokemonData = {
      id: 25,
      name: 'pikachu',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      },
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      height: 4,
      weight: 60,
      stats: [
        {
          base_stat: 35,
          effort: 0,
          stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
        },
      ],
    };

    const expected: Pokemon = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25',
      details: {
        id: 25,
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        },
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        height: 4,
        weight: 60,
        stats: [
          {
            base_stat: 35,
            effort: 0,
            stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
          },
        ],
      },
    };

    const result = formatPokemon(rawData);
    expect(result).toEqual(expected);
  });

  it('should handle missing properties gracefully', () => {
    const rawData = {
      id: 25,
      name: 'pikachu',
    } as unknown as RawPokemonData;

    const expected: Pokemon = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25',
      details: {
        id: 25,
        sprites: { front_default: '' },
        types: [],
        abilities: [],
        height: 0,
        weight: 0,
        stats: [],
      },
    };

    const result = formatPokemon(rawData);
    expect(result).toEqual(expected);
  });

  it('should format with partial details', () => {
    const rawData = {
      id: 25,
      name: 'pikachu',
      sprites: {
        front_default: 'pikachu-image.png',
      },
      types: [{ type: { name: 'electric' } }],
    } as RawPokemonData;

    const expected: Pokemon = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25',
      details: {
        id: 25,
        sprites: { front_default: 'pikachu-image.png' },
        types: [{ type: { name: 'electric' } }],
        abilities: [],
        height: 0,
        weight: 0,
        stats: [],
      },
    };

    const result = formatPokemon(rawData);
    expect(result).toEqual(expected);
  });
});
