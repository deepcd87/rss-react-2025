import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import AboutPage from './pages/About/AboutPage';
import SearchResult from './components/SearchResult/SearchResult';
import { fetchData } from './api/fetchData';
import type { Pokemon } from './@types/types';
import styles from './App.module.css';

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const urlSearchValue = searchParams.get('search') || '';
  const [totalCount, setTotalCount] = useState(0);

  const [searchValue, setSearchValue] = useState(
    () => localStorage.getItem('searchValue') || ''
  );
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const api = `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`;
      const data = await fetchData(api);

      setTotalCount(data.count);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSearchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const api = 'https://pokeapi.co/api/v2/pokemon';
      const url = `${api}/${searchValue.trim().toLowerCase()}`;
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
      setTotalCount(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find Pokémon');
      setPokemonList([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!urlSearchValue) {
      fetchInitialData(currentPage);
    }
  }, [currentPage, fetchInitialData, urlSearchValue]);

  const handleSearchChange = (term: string) => {
    setSearchValue(term);
  };
  const handleSearchSubmit = () => {
    const trimmedSearchValue = searchValue.trim().toLowerCase();
    localStorage.setItem('searchValue', trimmedSearchValue);

    if (trimmedSearchValue === '') {
      fetchInitialData(currentPage);
    } else {
      fetchSearchData();
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  return (
    <div className={styles.app}>
      <Header
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />
      <Routes>
        <Route
          path="/"
          element={
            <SearchResult
              pokemonList={pokemonList}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

export default App;
