import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import { fetchData } from './api/fetchData';
import type { AppState, Pokemon } from './@types/types';
import errorStyles from './error/ErrorBoundary.module.css';
import styles from './App.module.css';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedSearch = localStorage.getItem('searchValue') || '';
    this.state = {
      searchValue: savedSearch,
      pokemonList: [],
      isLoading: false,
      error: null,
      testError: false,
    };
  }

  componentDidMount() {
    this.fetchApiData();
  }

  handleSearchChange = (term: string) => {
    this.setState({ searchValue: term });
  };

  handleSearchSubmit = () => {
    const trimmedSearchValue = this.state.searchValue.trim().toLowerCase();
    localStorage.setItem('searchValue', trimmedSearchValue);
    this.fetchApiData();
  };

  triggerError = () => {
    this.setState({ testError: true });
    throw new Error('This is a test error for ErrorBoundary');
  };

  handleReload = () => {
    window.location.reload();
  };

  fetchApiData = async () => {
    this.setState({ isLoading: true, error: null });
    const api = 'https://pokeapi.co/api/v2/pokemon';

    try {
      const searchQuery = this.state.searchValue;

      if (searchQuery) {
        const url = `${api}/${searchQuery}`;
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

        this.setState({ pokemonList: [pokemon] });
      } else {
        const url = `${api}?limit=12`;
        const data = await fetchData(url);

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

        this.setState({ pokemonList: pokemonWithDetails });
      }
    } catch (error) {
      this.setState({
        error:
          error instanceof Error ? error.message : 'Failed to fetch Pokémon',
        pokemonList: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    if (this.state.testError) {
      return (
        <div className={errorStyles.errorFallback}>
          <h2>Something went wrong.</h2>
          <p>Please try reloading the page.</p>
          <button
            className={errorStyles.reloadButton}
            onClick={this.handleReload}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return (
      <div className={styles.app}>
        <h1 className={styles.title}>Pokémon Search</h1>
        <SearchInput
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
          isLoading={this.state.isLoading}
        />
        <SearchResult
          pokemonList={this.state.pokemonList}
          isLoading={this.state.isLoading}
          error={this.state.error}
          triggerError={this.triggerError}
        />
      </div>
    );
  }
}

export default App;
