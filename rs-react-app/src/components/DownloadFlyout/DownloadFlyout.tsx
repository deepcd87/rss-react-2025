import { useSelectedPokemonStore } from '@/store/selectedPokemonStore';
import { downloadPokemonCSV } from '@/utils/downloadPokemonCSV';
import styles from './DownloadFlyout.module.css';

export const DownloadFlyout = () => {
  const { selectedPokemon, clearSelected } = useSelectedPokemonStore();

  const selectedItems = Object.values(selectedPokemon).filter(
    (item) => item.selected
  );
  const selectedCount = selectedItems.length;

  const handleDownload = () => {
    downloadPokemonCSV(selectedPokemon);
  };

  if (selectedCount === 0) return null;

  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutContent}>
        <span>
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
        </span>
        <button onClick={clearSelected} className={styles.flyoutButton}>
          Unselect all
        </button>
        <button onClick={handleDownload} className={styles.flyoutButton}>
          Download
        </button>
      </div>
    </div>
  );
};
