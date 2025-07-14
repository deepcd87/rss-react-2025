import { Component } from 'react';
import type { SearchProps } from '../../@types/types';
import './SearchInput.css';

class SearchInput extends Component<SearchProps> {
  render() {
    return (
      <div className="search-section">
        <input
          className="search-section-input"
          type="text"
          value={this.props.searchValue}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
          placeholder="Search Pokémon..."
        />
        <button
          className="search-section-btn"
          onClick={this.props.onSearchSubmit}
          disabled={this.props.isLoading}
        >
          {this.props.isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }
}

export default SearchInput;
