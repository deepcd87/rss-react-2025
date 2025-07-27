import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';

const Header = ({
  onSearchSubmit,
}: {
  onSearchSubmit: (term: string) => void;
}) => {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');

  const handleSearchSubmit = () => {
    const trimmedValue = searchValue.trim().toLowerCase();
    localStorage.setItem('searchValue', trimmedValue);
    onSearchSubmit(trimmedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
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
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Pokémon..."
          autoFocus
        />
        <button
          className={styles.searchSectionBtn}
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
