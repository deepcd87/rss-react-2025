import { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  render() {
    return (
      <div className="search-section">
        <input type="text" placeholder="Search Pokémon..." />
        <button>Search</button>
      </div>
    );
  }
}

export default SearchInput;
