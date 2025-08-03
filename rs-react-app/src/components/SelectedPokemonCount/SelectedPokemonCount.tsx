import { useSelectedPokemonStore } from '../../store/selectedPokemonStore';
import styles from './SelectedPokemonCount.module.css';

export const SelectedPokemonCount = () => {
  const { selectedPokemon } = useSelectedPokemonStore();
  const count = Object.keys(selectedPokemon).filter(
    (id) => selectedPokemon[id]
  ).length;

  console.log(selectedPokemon);

  return <div className={styles.selectedCount}>Selected: {count}</div>;
};
