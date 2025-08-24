import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import UncontrolledFormModal from './components/UncontrolledFormModal';
import HookFormModal from './components/HookFormModal';
import { useStore } from './store/store';
import './App.css';

function App() {
  const [showUncontrolledModal, setShowUncontrolledModal] = useState(false);
  const [showHookFormModal, setShowHookFormModal] = useState(false);
  const { fetchCountries } = useStore();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <div className="app">
      <MainPage
        onOpenUncontrolled={() => setShowUncontrolledModal(true)}
        onOpenHookForm={() => setShowHookFormModal(true)}
      />

      {showUncontrolledModal && (
        <UncontrolledFormModal
          onClose={() => setShowUncontrolledModal(false)}
        />
      )}

      {showHookFormModal && (
        <HookFormModal onClose={() => setShowHookFormModal(false)} />
      )}
    </div>
  );
}

export default App;
