import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import { formatPokemon } from '../../utils/formatPokemon';
import { ITEMS_PER_PAGE } from '../../@types/constants';
import {
  usePokemonSearch,
  usePokemonListWithDetails,
} from '../../hooks/queries';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('details');
  const { searchTerm } = useOutletContext<{ searchTerm: string }>();

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

  // Update URL parameters
  const updateURL = (newPage: number, newDetailsId?: string) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', newPage.toString());
    if (newDetailsId) params.set('details', newDetailsId);
    if (searchTerm) params.set('search', searchTerm);
    setSearchParams(params);
  };

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
};

export default MainPage;
