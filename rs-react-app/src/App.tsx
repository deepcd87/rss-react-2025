import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import { ThemeProvider } from './context/ThemeProvider';
import { ThemeManager } from './components/ThemeManager/ThemeManager';
import styles from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div className={styles.appContainer} data-testid="app-container">
      <ThemeProvider>
        <ThemeManager />
        <Header onSearchSubmit={handleSearchSubmit} />
        <main role="main">
          <Outlet context={{ searchTerm }} />
        </main>
      </ThemeProvider>
    </div>
  );
};

export default App;
