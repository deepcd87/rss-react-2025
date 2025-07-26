import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import type { SearchProps } from '../../@types/types';

const Header = ({
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
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>
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
    </header>
  );
};

export default Header;
