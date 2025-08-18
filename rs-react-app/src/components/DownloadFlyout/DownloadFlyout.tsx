import { useSelectedPokemonStore } from '@/store/selectedPokemonStore';
import { downloadPokemonCSV } from '@/utils/downloadPokemonCSV';
import styles from './DownloadFlyout.module.css';
import { useTranslations } from 'next-intl';

export const DownloadFlyout = () => {
  const { selectedPokemon, clearSelected } = useSelectedPokemonStore();
  const t = useTranslations('pokemonList.downloadFlyout');

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
        <span>{t('selected', { count: selectedCount })}</span>
        <button onClick={clearSelected} className={styles.flyoutButton}>
          {t('unselect')}
        </button>
        <button onClick={handleDownload} className={styles.flyoutButton}>
          {t('download')}
        </button>
      </div>
    </div>
  );
};
