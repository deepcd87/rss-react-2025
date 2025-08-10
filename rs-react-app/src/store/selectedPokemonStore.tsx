import { create } from 'zustand';
import type { SelectedPokemonStore } from '../@types/types';

export const useSelectedPokemonStore = create<SelectedPokemonStore>((set) => ({
  selectedPokemon: {},
  togglePokemon: (pokemon) =>
    set((state) => {
      const id = pokemon.details?.id.toString();
      if (!id) return state;

      return {
        selectedPokemon: {
          ...state.selectedPokemon,
          [id]: {
            selected: !state.selectedPokemon[id]?.selected,
            data: pokemon,
          },
        },
      };
    }),
  clearSelected: () => set({ selectedPokemon: {} }),
}));
