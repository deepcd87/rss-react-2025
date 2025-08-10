import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  usePokemonList,
  usePokemonDetails,
  usePokemonSearch,
  usePokemonListWithDetails,
} from '../queries';
import { fetchData } from '../../api/fetchData';
import { ITEMS_PER_PAGE } from '../../@types/constants';
import type { Mock } from 'vitest';
import React from 'react';

// Mock the fetchData module
vi.mock('../../api/fetchData');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };

  // Add display name to fix ESLint error
  Wrapper.displayName = 'TestWrapper';

  return Wrapper;
};

describe('query hooks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('usePokemonList', () => {
    it('fetches pokemon list successfully', async () => {
      const mockData = {
        count: 100,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };
      (fetchData as Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => usePokemonList(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(fetchData).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=0`
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it('handles fetch error', async () => {
      const errorMessage = 'Network error';
      (fetchData as Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => usePokemonList(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error(errorMessage));
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('usePokemonDetails', () => {
    it('fetches pokemon details when enabled', async () => {
      const mockData = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'image-url' },
        types: [],
        abilities: [],
        height: 7,
        weight: 69,
        stats: [],
      };
      (fetchData as Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => usePokemonDetails('bulbasaur'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(fetchData).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it('does not fetch when disabled', () => {
      renderHook(() => usePokemonDetails(''), {
        wrapper: createWrapper(),
      });

      expect(fetchData).not.toHaveBeenCalled();
    });

    it('handles not found error', async () => {
      (fetchData as Mock).mockRejectedValue(new Error('Pokémon not found'));

      const { result } = renderHook(() => usePokemonDetails('invalid'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error('Pokémon not found'));
    });
  });

  describe('usePokemonSearch', () => {
    it('searches pokemon successfully', async () => {
      const mockData = {
        id: 1,
        name: 'pikachu',
        sprites: { front_default: 'image-url' },
        types: [],
        abilities: [],
        height: 4,
        weight: 60,
        stats: [],
      };
      (fetchData as Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => usePokemonSearch('pikachu'), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(fetchData).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
    });

    it('does not search with empty term', () => {
      renderHook(() => usePokemonSearch(''), {
        wrapper: createWrapper(),
      });

      expect(fetchData).not.toHaveBeenCalled();
    });

    it('handles search error without retrying', async () => {
      const errorMessage = 'Pokémon not found';
      (fetchData as Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => usePokemonSearch('invalid'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error(errorMessage));
      expect(fetchData).toHaveBeenCalledTimes(1);
    });
  });

  describe('usePokemonListWithDetails', () => {
    it('fetches pokemon list with details', async () => {
      const mockListData = {
        count: 2,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      const mockDetails1 = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'bulbasaur-img' },
        types: [{ type: { name: 'grass' } }],
        abilities: [],
        height: 7,
        weight: 69,
        stats: [],
      };

      const mockDetails2 = {
        id: 2,
        name: 'ivysaur',
        sprites: { front_default: 'ivysaur-img' },
        types: [{ type: { name: 'grass' } }],
        abilities: [],
        height: 10,
        weight: 130,
        stats: [],
      };

      (fetchData as Mock)
        .mockResolvedValueOnce(mockListData)
        .mockResolvedValueOnce(mockDetails1)
        .mockResolvedValueOnce(mockDetails2);

      const { result } = renderHook(() => usePokemonListWithDetails(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(fetchData).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=0`
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual({
        count: 2,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            details: {
              id: 1,
              sprites: { front_default: 'bulbasaur-img' },
              types: [{ type: { name: 'grass' } }],
              abilities: [],
              height: 7,
              weight: 69,
              stats: [],
            },
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
            details: {
              id: 2,
              sprites: { front_default: 'ivysaur-img' },
              types: [{ type: { name: 'grass' } }],
              abilities: [],
              height: 10,
              weight: 130,
              stats: [],
            },
          },
        ],
      });

      expect(fetchData).toHaveBeenCalledTimes(3);
    });

    it('does not fetch when page is undefined', () => {
      renderHook(() => usePokemonListWithDetails(undefined), {
        wrapper: createWrapper(),
      });

      expect(fetchData).not.toHaveBeenCalled();
    });

    it('handles error in list fetch', async () => {
      (fetchData as Mock).mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => usePokemonListWithDetails(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error('Network error'));
    });

    it('handles error in details fetch', async () => {
      const mockListData = {
        count: 2,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      (fetchData as Mock)
        .mockResolvedValueOnce(mockListData)
        .mockRejectedValueOnce(new Error('Details error'))
        .mockResolvedValueOnce({});

      const { result } = renderHook(() => usePokemonListWithDetails(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toEqual(new Error('Details error'));
    });
  });
});
