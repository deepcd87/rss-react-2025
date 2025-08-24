import { create } from 'zustand';
import type { Country, FormData } from '../types/types';

interface Store {
  forms: FormData[];
  countries: Country[];
  addForm: (form: Omit<FormData, 'id' | 'createdAt'>) => void;
  fetchCountries: () => void;
}

export const useStore = create<Store>((set) => ({
  forms: [],
  countries: [],

  addForm: (formData) => {
    const newForm = {
      ...formData,
      id: Date.now(),
      createdAt: new Date(),
    };
    set((state) => ({ forms: [...state.forms, newForm] }));
  },

  fetchCountries: async () => {
    const countriesList: Country[] = [
      { name: 'United States', code: 'US' },
      { name: 'Canada', code: 'CA' },
      { name: 'United Kingdom', code: 'UK' },
      { name: 'Australia', code: 'AU' },
      { name: 'Germany', code: 'DE' },
      { name: 'France', code: 'FR' },
      { name: 'Japan', code: 'JP' },
      { name: 'Brazil', code: 'BR' },
    ];
    set({ countries: countriesList });
  },
}));
