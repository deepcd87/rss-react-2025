import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
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
});
