import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.headerSection}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
