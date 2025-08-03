import type { Pokemon } from '../../@types/types';
import styles from './PokemonDetails.module.css';

const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className={styles.details} data-testid="pokemon-details">
      <div className={styles.title}>
        <h2>{pokemon.name.toUpperCase()}</h2>
      </div>
      <img
        src={pokemon.details?.sprites.front_default}
        alt={pokemon.name}
        className={styles.detailImage}
      />
      <div className={styles.stats}>
        <p>
          <strong>ID:</strong> {pokemon.details?.id}
        </p>
        <p>
          <strong>Types:</strong>{' '}
          {pokemon.details?.types.map((t) => t.type.name).join(', ')}
        </p>
        <p>
          <strong>Abilities:</strong>{' '}
          {pokemon.details?.abilities.map((a) => a.ability.name).join(', ')}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.details?.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.details?.weight}
        </p>
        <div className={styles.statList} data-testid="pokemon-stats">
          <h3>Stats:</h3>
          {pokemon.details?.stats.map((stat) => (
            <p key={stat.stat.name}>
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
