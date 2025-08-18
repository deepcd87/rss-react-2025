import type { Pokemon, RawPokemonData } from '@/@types/types';

export const formatPokemon = (data: RawPokemonData): Pokemon => ({
  name: data.name,
  url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
  details: {
    id: data.id,
    sprites: data.sprites ?? { front_default: '' },
    types: data.types ?? [],
    abilities: data.abilities ?? [],
    height: data.height ?? 0,
    weight: data.weight ?? 0,
    stats: data.stats ?? [],
  },
});
