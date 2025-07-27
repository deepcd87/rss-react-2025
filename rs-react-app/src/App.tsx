import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import styles from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div className={styles.appContainer}>
      <Header onSearchSubmit={handleSearchSubmit} />
      <Outlet context={{ searchTerm }} />
    </div>
  );
};

export default App;
