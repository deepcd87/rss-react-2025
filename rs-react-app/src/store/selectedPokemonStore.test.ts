import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedPokemonStore } from './selectedPokemonStore';
import type { Pokemon } from '../@types/types';

describe('selectedPokemonStore', () => {
  const mockPokemon1: Pokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    details: {
      id: 1,
      sprites: { front_default: '' },
      types: [],
      abilities: [],
      height: 0,
      weight: 0,
      stats: [],
    },
  };

  const mockPokemon2: Pokemon = {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    details: {
      id: 2,
      sprites: { front_default: '' },
      types: [],
      abilities: [],
      height: 0,
      weight: 0,
      stats: [],
    },
  };

  beforeEach(() => {
    useSelectedPokemonStore.setState({
      selectedPokemon: {},
    });
  });

  it('should initialize with empty selectedPokemon', () => {
    const state = useSelectedPokemonStore.getState();
    expect(state.selectedPokemon).toEqual({});
  });

  it('should toggle pokemon selection', () => {
    useSelectedPokemonStore.getState().togglePokemon(mockPokemon1);
    let state = useSelectedPokemonStore.getState();
    expect(state.selectedPokemon['1']).toEqual({
      selected: true,
      data: mockPokemon1,
    });

    useSelectedPokemonStore.getState().togglePokemon(mockPokemon1);
    state = useSelectedPokemonStore.getState();
    expect(state.selectedPokemon['1']).toEqual({
      selected: false,
      data: mockPokemon1,
    });
  });

  it('should handle multiple pokemon selections', () => {
    useSelectedPokemonStore.getState().togglePokemon(mockPokemon1);
    useSelectedPokemonStore.getState().togglePokemon(mockPokemon2);

    const state = useSelectedPokemonStore.getState();
    expect(Object.keys(state.selectedPokemon)).toHaveLength(2);
    expect(state.selectedPokemon['1']).toEqual({
      selected: true,
      data: mockPokemon1,
    });
    expect(state.selectedPokemon['2']).toEqual({
      selected: true,
      data: mockPokemon2,
    });
  });

  it('should return current state if pokemon has no details', () => {
    const pokemonWithoutDetails = {
      name: 'missingno',
      url: 'https://pokeapi.co/api/v2/pokemon/0/',
    };

    const initialState = useSelectedPokemonStore.getState();
    useSelectedPokemonStore
      .getState()
      .togglePokemon(pokemonWithoutDetails as Pokemon);
    const newState = useSelectedPokemonStore.getState();

    expect(newState).toEqual(initialState);
  });

  it('should clear all selections', () => {
    useSelectedPokemonStore.getState().togglePokemon(mockPokemon1);
    useSelectedPokemonStore.getState().togglePokemon(mockPokemon2);

    useSelectedPokemonStore.getState().clearSelected();

    const state = useSelectedPokemonStore.getState();
    expect(state.selectedPokemon).toEqual({});
  });

  it('should maintain separate instances of the store', () => {
    const store1 = useSelectedPokemonStore;
    const store2 = useSelectedPokemonStore;

    store1.getState().togglePokemon(mockPokemon1);
    expect(store1.getState().selectedPokemon).toEqual({
      '1': {
        selected: true,
        data: mockPokemon1,
      },
    });
    expect(store2.getState().selectedPokemon).toEqual({
      '1': {
        selected: true,
        data: mockPokemon1,
      },
    });
  });
});
