export type AppState = {
  searchValue: string;
  pokemonList: Pokemon[];
};

export type SearchProps = {
  searchValue: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
};

export type Pokemon = {
  name: string;
  url: string;
  details?: PokemonDetails;
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
};
