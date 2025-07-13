import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import { fetchData } from './utils/fetchData';
import type { AppState, Pokemon } from './@types/types';
import './App.css';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedSearch = localStorage.getItem('searchValue') || '';
    this.state = {
      searchValue: savedSearch,
      pokemonList: [],
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

  fetchApiData = async () => {
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
        console.log(this.state.pokemonList);
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
        console.log(this.state.pokemonList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">Pokémon Search</h1>
        <SearchInput
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange}
          onSearchSubmit={this.handleSearchSubmit}
        />
        <SearchResult />
      </div>
    );
  }
}

export default App;
