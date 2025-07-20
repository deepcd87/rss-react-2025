import { render, screen } from '@testing-library/react';
import SearchResult from './SearchResult';
import { mockPokemonList } from '../../test-utils/mockData';
import { vi } from 'vitest';

describe('SearchResult', () => {
  it('displays "No Pokémon found." when data array is empty', () => {
    render(
      <SearchResult
        pokemonList={[]}
        isLoading={false}
        error={null}
        triggerError={vi.fn()}
      />
    );

    const message = screen.getByText(/no pokémon found\./i);
    expect(message).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(
      <SearchResult
        pokemonList={[]}
        isLoading={true}
        error={null}
        triggerError={vi.fn()}
      />
    );

    const loadingText = screen.getByText(/loading pokémon/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('displays error message when API call fails', () => {
    const errorMessage = 'Failed to fetch Pokémon';

    render(
      <SearchResult
        pokemonList={[]}
        isLoading={false}
        error={errorMessage}
        triggerError={vi.fn()}
      />
    );

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });

  it('renders correct number of items when data is provided', () => {
    render(
      <SearchResult
        pokemonList={mockPokemonList}
        isLoading={false}
        error={null}
        triggerError={vi.fn()}
      />
    );

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(mockPokemonList.length);
  });
});
