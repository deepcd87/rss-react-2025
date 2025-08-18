'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Header = ({
  onSearchSubmit,
}: {
  onSearchSubmit: (term: string) => void;
}) => {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('header');

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
              {t('home')}
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              {t('about')}
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
          placeholder={t('searchPlaceholder')}
          autoFocus
        />
        <button
          className={styles.searchSectionBtn}
          onClick={handleSearchSubmit}
        >
          {t('searchButton')}
        </button>
        <div>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? t('themeToggle.dark') : t('themeToggle.light')}
          </button>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
