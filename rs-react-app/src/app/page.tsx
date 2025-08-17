'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import PokemonList from '../components/PokemonList/PokemonList';
import { useMemo } from 'react';
import { formatPokemon } from '../utils/formatPokemon';
import { ITEMS_PER_PAGE } from '../@types/constants';
import { usePokemonSearch, usePokemonListWithDetails } from '../hooks/queries';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams?.get('page');
  const detailsParam = searchParams?.get('details');
  const searchParam = searchParams?.get('search');

  const currentPage = pageParam ? Number(pageParam) : 1;
  const detailsId = detailsParam || null;
  const searchTerm = searchParam || '';

  const updateURL = (newPage: number, newDetailsId?: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (newPage > 1) params.set('page', newPage.toString());
    else params.delete('page');

    if (newDetailsId) params.set('details', newDetailsId);
    else params.delete('details');

    if (searchTerm) params.set('search', searchTerm);
    else params.delete('search');

    router.push(`/?${params.toString()}`);
  };

  // Queries
  const listQuery = usePokemonListWithDetails(
    searchTerm ? undefined : currentPage
  );
  const searchQuery = usePokemonSearch(searchTerm || '');

  // Combined loading state
  const isLoading = searchTerm ? searchQuery.isLoading : listQuery.isLoading;
  const error = useMemo(() => {
    if (searchTerm) return searchQuery.error?.message || null;
    return listQuery.error?.message || null;
  }, [searchTerm, searchQuery.error, listQuery.error]);

  // Derived data
  const pokemonList = useMemo(() => {
    if (searchTerm) {
      return searchQuery.data ? [formatPokemon(searchQuery.data)] : [];
    } else {
      return listQuery.data?.results || [];
    }
  }, [searchTerm, searchQuery.data, listQuery.data]);

  const totalCount = useMemo(() => {
    if (searchTerm) {
      return searchQuery.data ? 1 : 0;
    } else {
      return listQuery.data?.count || 0;
    }
  }, [searchTerm, searchQuery.data, listQuery.data]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Handlers
  const handlePageChange = (newPage: number) => {
    updateURL(newPage, detailsId || undefined);
  };

  const handlePokemonSelect = (id: string) => {
    updateURL(currentPage, id);
  };

  const handleCloseDetails = () => {
    updateURL(currentPage);
  };

  const handleRefresh = () => {
    if (searchTerm) {
      searchQuery.refetch();
    } else {
      listQuery.refetch();
    }
  };

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
      onRefresh={handleRefresh}
      isRefreshing={searchQuery.isRefetching || listQuery.isRefetching}
    />
  );
}
