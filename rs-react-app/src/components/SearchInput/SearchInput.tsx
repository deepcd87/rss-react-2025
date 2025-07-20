import { Component } from 'react';
import type { SearchProps } from '../../@types/types';
import styles from './SearchInput.module.css';

class SearchInput extends Component<SearchProps> {
  render() {
    return (
      <div className={styles.searchSection}>
        <input
          className={styles.searchSectionInput}
          type="text"
          value={this.props.searchValue}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
          placeholder="Search Pokémon..."
        />
        <button
          className={styles.searchSectionBtn}
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
