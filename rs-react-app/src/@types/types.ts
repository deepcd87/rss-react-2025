export type AppState = {
  searchValue: string;
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
  testError: boolean;
};

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type SearchProps = {
  searchValue: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  isLoading: boolean;
};

export type ResultsProps = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  selectedId?: string | null;
  onPokemonSelect: (id: string) => void;
  onCloseDetails: () => void;
  onPageChange: (page: number) => void;
};

export type Pokemon = {
  name: string;
  url: string;
  details: PokemonDetails;
};

export type PokemonDetails = {
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export interface SelectedPokemonStore {
  selectedPokemon: Record<string, { selected: boolean; data: Pokemon }>;
  togglePokemon: (pokemon: Pokemon) => void;
  clearSelected: () => void;
}

export interface SelectedPokemonItem {
  selected: boolean;
  data: Pokemon;
}
