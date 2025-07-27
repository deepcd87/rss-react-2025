import type { Pokemon } from '../@types/types';

export const mockPokemonList: Pokemon[] = [
  {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon',
    details: {
      id: 25,
      sprites: { front_default: 'pikachu.png' },
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
    },
  },
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon',
    details: {
      id: 1,
      sprites: { front_default: 'bulbasaur.png' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
    },
  },
];
