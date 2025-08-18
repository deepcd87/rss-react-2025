import type { ResultsProps } from '../../@types/types';
import styles from './PokemonList.module.css';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import { useSelectedPokemonStore } from '../../store/selectedPokemonStore';
import { DownloadFlyout } from '../DownloadFlyout/DownloadFlyout';
import Image from 'next/image';

const PokemonList = ({
  pokemonList,
  isLoading,
  error,
  currentPage,
  totalPages,
  selectedId,
  onPokemonSelect,
  onCloseDetails,
  onPageChange,
  onRefresh,
  isRefreshing,
}: ResultsProps) => {
  const { selectedPokemon, togglePokemon } = useSelectedPokemonStore();

  const selectedPokemonDetails = pokemonList.find(
    (p) => p.details?.id.toString() === selectedId
  );

  if (isLoading) {
    return (
      <div className={styles.resultsSectionLoading}>
        <div className={styles.spinner}></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.resultsSectionError} data-testid="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {' '}
      <div className={styles.controlsSection}>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={styles.refreshButton}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.master} ${selectedPokemonDetails ? styles.hasDetail : ''}`}
        >
          {pokemonList.length === 0 ? (
            <p className={styles.noResults}>No Pokémon found.</p>
          ) : (
            <div className={styles.pokemonGrid}>
              {pokemonList.map((pokemon) => (
                <div
                  key={pokemon.name}
                  className={`${styles.pokemonCard} ${pokemon.details?.id.toString() === selectedId ? styles.selected : ''}`}
                  onClick={() =>
                    pokemon.details &&
                    onPokemonSelect(pokemon.details.id.toString())
                  }
                  role="button"
                  aria-label={`${pokemon.name} pokemon card`}
                  data-testid={`pokemon-card-${pokemon.name}`}
                >
                  {pokemon.details && (
                    <input
                      type="checkbox"
                      checked={
                        !!selectedPokemon[pokemon.details?.id.toString()]
                          ?.selected
                      }
                      onChange={(e) => {
                        e.stopPropagation();
                        togglePokemon(pokemon);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={styles.checkbox}
                    />
                  )}
                  <h3>{pokemon.name.toUpperCase()}</h3>
                  {pokemon.details && (
                    <>
                      <Image
                        src={pokemon.details.sprites.front_default}
                        alt={pokemon.name}
                        width={96}
                        height={96}
                        className={styles.pokemonAvatar}
                        priority={pokemon.details?.id.toString() === selectedId}
                      />
                      <p>id: {pokemon.details.id}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className={styles.paginationButton}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                className={styles.paginationButton}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {selectedPokemonDetails && (
          <div className={styles.detail}>
            <button
              onClick={onCloseDetails}
              className={styles.closeButton}
              aria-label="Close details"
            >
              ×
            </button>
            <PokemonDetails pokemon={selectedPokemonDetails} />
          </div>
        )}
        <DownloadFlyout />
      </div>
    </>
  );
};

export default PokemonList;
