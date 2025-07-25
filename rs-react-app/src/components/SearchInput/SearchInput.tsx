import type { SearchProps } from '../../@types/types';
import styles from './SearchInput.module.css';

const SearchInput = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  isLoading,
}: SearchProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };
  return (
    <div className={styles.searchSection}>
      <input
        className={styles.searchSectionInput}
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Pokémon..."
        autoFocus
      />
      <button
        className={styles.searchSectionBtn}
        onClick={onSearchSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchInput;
