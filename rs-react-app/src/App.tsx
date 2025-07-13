import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import SearchResult from './components/SearchResult/SearchResult';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="title">Pokémon Search</h1>
        <SearchInput />
        <SearchResult />
      </div>
    );
  }
}

export default App;
