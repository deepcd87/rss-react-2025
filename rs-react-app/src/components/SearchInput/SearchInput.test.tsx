import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';
import { vi } from 'vitest';

describe('SearchInput', () => {
  it('renders search input and search button', () => {
    render(
      <SearchInput
        searchValue=""
        onSearchChange={vi.fn()}
        onSearchSubmit={vi.fn()}
        isLoading={false}
      />
    );

    // Rendering Tests
    const inputElement = screen.getByPlaceholderText('Search Pokémon...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');

    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Search');
  });

  // User Interaction Tests

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SearchInput
        searchValue=""
        onSearchChange={handleChange}
        onSearchSubmit={vi.fn()}
        isLoading={false}
      />
    );

    const inputElement = screen.getByPlaceholderText(/search pokémon/i);
    await user.type(inputElement, 'pikachu');

    expect(handleChange).toHaveBeenCalledTimes(7);
    expect(handleChange.mock.calls.map((c) => c[0])).toEqual([
      'p',
      'i',
      'k',
      'a',
      'c',
      'h',
      'u',
    ]);
  });
});
