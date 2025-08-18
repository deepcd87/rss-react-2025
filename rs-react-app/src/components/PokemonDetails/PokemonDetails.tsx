import Image from 'next/image';
import type { Pokemon } from '@/@types/types';
import styles from './PokemonDetails.module.css';
import { useTranslations } from 'next-intl';

const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
  const t = useTranslations('pokemonDetails');
  return (
    <div className={styles.details}>
      <div className={styles.title}>
        <h2>{pokemon.name.toUpperCase()}</h2>
      </div>
      <Image
        src={pokemon.details?.sprites.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
        className={styles.detailImage}
        priority
      />
      <div className={styles.stats}>
        <p>
          <strong>ID:</strong> {pokemon.details?.id}
        </p>
        <p>
          <strong>{t('types')}:</strong>{' '}
          {pokemon.details?.types.map((t) => t.type.name).join(', ')}
        </p>
        <p>
          <strong>{t('abilities')}:</strong>{' '}
          {pokemon.details?.abilities.map((a) => a.ability.name).join(', ')}
        </p>
        <p>
          <strong>{t('height')}:</strong> {pokemon.details?.height}
        </p>
        <p>
          <strong>{t('weight')}:</strong> {pokemon.details?.weight}
        </p>
        <div className={styles.statList} data-testid="pokemon-stats">
          <h3>{t('stats')}:</h3>
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
