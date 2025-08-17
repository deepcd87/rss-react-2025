'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';

const Header = ({
  onSearchSubmit,
}: {
  onSearchSubmit: (term: string) => void;
}) => {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');
  const { theme, toggleTheme } = useTheme();

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
    <header className={`${styles.header} ${styles[theme]}`}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
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
        <div>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
