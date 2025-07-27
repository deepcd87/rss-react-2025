import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div className="app-container">
      <Header onSearchSubmit={handleSearchSubmit} />
      <Outlet context={{ searchTerm }} />
    </div>
  );
};

export default App;
