import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import { fetchData } from '../../api/fetchData';
import type { Pokemon } from '../../@types/types';

const ITEMS_PER_PAGE = 12;

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('details');
  const { searchTerm } = useOutletContext<{ searchTerm: string }>();

  const [totalCount, setTotalCount] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateURL = (newPage: number, newDetailsId?: string) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', newPage.toString());
    if (newDetailsId) params.set('details', newDetailsId);
    if (searchTerm) params.set('search', searchTerm);
    setSearchParams(params);
  };

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
          console.log('Respo', details);

          return {
            ...p,
            details: {
              id: details.id,
              sprites: details.sprites,
              types: details.types,
              abilities: details.abilities,
              height: details.height,
              weight: details.weight,
              species: details.species,
              // stats: details.stats.map((stat: a) => ({
              //   name: stat.stat.name,
              //   value: stat.base_stat,
              // })),
              stats: details.stats,
            },
          };
        })
      );
      console.log('Poki', pokemonWithDetails);
      setPokemonList(pokemonWithDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSearchData = useCallback(async (term: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const api = 'https://pokeapi.co/api/v2/pokemon';
      const url = `${api}/${term}`;
      const data = await fetchData(url);
      console.log(await data);
      const pokemon: Pokemon = {
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
        details: {
          id: data.id,
          sprites: data.sprites,
          types: data.types,
          abilities: data.abilities,
          height: data.height,
          weight: data.weight,
          // stats: data.stats.map((stat: any) => ({
          //   name: stat.stat.name,
          //   value: stat.base_stat,
          // })),
          stats: data.stats,
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
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchData(searchTerm);
    } else {
      fetchInitialData(currentPage);
    }
  }, [searchTerm, currentPage, fetchInitialData, fetchSearchData]);

  const handlePageChange = (newPage: number) => {
    updateURL(newPage, detailsId || undefined);
  };

  const handlePokemonSelect = (id: string) => {
    updateURL(currentPage, id);
  };

  const handleCloseDetails = () => {
    updateURL(currentPage);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <PokemonList
      pokemonList={pokemonList}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedId={detailsId}
      onPokemonSelect={handlePokemonSelect}
      onCloseDetails={handleCloseDetails}
      onPageChange={handlePageChange}
    />
  );
};

export default MainPage;
