import { create } from 'zustand';
import type { SelectedPokemonStore } from '../@types/types';

export const useSelectedPokemonStore = create<SelectedPokemonStore>((set) => ({
  selectedPokemon: {},
  togglePokemon: (id) =>
    set((state) => ({
      selectedPokemon: {
        ...state.selectedPokemon,
        [id]: !state.selectedPokemon[id],
      },
    })),
  clearSelected: () => set({ selectedPokemon: {} }),
}));
