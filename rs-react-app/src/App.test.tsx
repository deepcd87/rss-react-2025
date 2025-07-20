import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import App from './App';
import { fetchData } from './api/fetchData';

vi.mock('./api/fetchData', () => ({
  fetchData: vi.fn().mockResolvedValue({
    name: 'pikachu',
    id: 25,
    sprites: {
      front_default: 'pikachu.png',
    },
    types: [{ type: { name: 'electric' } }],
    abilities: [{ ability: { name: 'static' } }],
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchValue', 'pikachu');

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/search pokémon/i);
    expect(inputElement).toHaveValue('pikachu');
  });

  it('Shows empty input when no saved term exists', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/search pokémon/i);
    expect(inputElement).toHaveValue('');
  });

  it('makes initial API call on component mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(1);
    });

    expect(fetchData).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=12'
    );
  });

  it('calls API with specific Pokémon URL when search term exists', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'pikachu');
    await waitFor(() => {
      expect(input).toHaveValue('pikachu');
    });
    await user.click(button);

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });

  it('manages loading states during API calls', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /searching/i });
    expect(button).toBeInTheDocument();

    expect(screen.getByText(/loading pokémon/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByRole('button', { name: /^search$/i })
    ).toBeInTheDocument();
  });

  it('handles successful API responses by rendering Pokémon card', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'pikachu');
    await user.click(button);

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText(/types: electric/i)).toBeInTheDocument();
    expect(screen.getByText(/abilities: static/i)).toBeInTheDocument();
  });

  it('handles API errors and updates state', async () => {
    const errorMessage = 'Network Error';
    (fetchData as Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    });
  });
});
