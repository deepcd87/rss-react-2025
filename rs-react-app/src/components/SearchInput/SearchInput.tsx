import { Component } from 'react';
import type { SearchProps } from '../../@types/types';
import './SearchInput.css';

class SearchInput extends Component<SearchProps> {
  render() {
    return (
      <div className="search-section">
        <input
          type="text"
          value={this.props.searchValue}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
          placeholder="Search Pokémon..."
        />
        <button onClick={this.props.onSearchSubmit}>Search</button>
      </div>
    );
  }
}

export default SearchInput;
