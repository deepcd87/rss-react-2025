import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/fetchData';
import type { Pokemon } from '../@types/types';
import { ITEMS_PER_PAGE } from '../@types/constants';

export const usePokemonList = (page: number) => {
  return useQuery({
    queryKey: ['pokemonList', page],
    queryFn: async () => {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const data = await fetchData(
        `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );
      return {
        count: data.count,
        results: data.results,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: async () => {
      if (!name) return null;
      return fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`);
    },
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePokemonSearch = (term: string) => {
  return useQuery({
    queryKey: ['pokemonSearch', term],
    queryFn: async () => {
      if (!term) return null;
      return fetchData(`https://pokeapi.co/api/v2/pokemon/${term}`);
    },
    enabled: !!term,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const usePokemonListWithDetails = (page: number | undefined) => {
  return useQuery({
    queryKey: ['pokemonListWithDetails', page],
    queryFn: async () => {
      if (page === undefined) return null;

      const offset = (page - 1) * ITEMS_PER_PAGE;
      const listData = await fetchData(
        `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );

      const resultsWithDetails = await Promise.all(
        listData.results.map(async (p: Pokemon) => {
          const details = await fetchData(p.url);
          return {
            name: p.name,
            url: p.url,
            details: {
              id: details.id,
              sprites: details.sprites,
              types: details.types,
              abilities: details.abilities,
              height: details.height,
              weight: details.weight,
              stats: details.stats,
            },
          };
        })
      );

      return {
        count: listData.count,
        results: resultsWithDetails,
      };
    },
    enabled: page !== undefined,
    staleTime: 5 * 60 * 1000,
  });
};
