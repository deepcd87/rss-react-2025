import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import { fetchData } from './api/fetchData';
import type { Pokemon } from './@types/types';
import styles from './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState(
    () => localStorage.getItem('searchValue') || ''
  );
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (term: string) => {
    setSearchValue(term);
  };

  const handleSearchSubmit = () => {
    const trimmedSearchValue = searchValue.trim().toLowerCase();
    localStorage.setItem('searchValue', trimmedSearchValue);
    fetchApiData();
  };

  const fetchApiData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const api = 'https://pokeapi.co/api/v2/pokemon';

    try {
      if (searchValue) {
        const url = `${api}/${searchValue}`;
        const data = await fetchData(url);
        const pokemon: Pokemon = {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
          details: {
            id: data.id,
            sprites: data.sprites,
            types: data.types,
            abilities: data.abilities,
          },
        };
        setPokemonList([pokemon]);
      } else {
        const url = `${api}?limit=12`;
        const data = await fetchData(url);
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (p: Pokemon) => {
            const detailsResponse = await fetch(p.url);
            const details = await detailsResponse.json();
            return {
              ...p,
              details: {
                id: details.id,
                sprites: details.sprites,
                types: details.types,
                abilities: details.abilities,
              },
            };
          })
        );
        setPokemonList(pokemonWithDetails);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  return (
    <div className={styles.app}>
      <Header />
      <h1 className={styles.title}>Pokémon Search</h1>
      <SearchInput
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />
      <SearchResult
        pokemonList={pokemonList}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default App;
