import type { ResultsProps } from '../../@types/types';
import styles from './PokemonList.module.css';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

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
}: ResultsProps) => {
  const selectedPokemon = pokemonList.find(
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
      <div className={styles.resultsSectionError}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.master} ${selectedPokemon ? styles.hasDetail : ''}`}
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
              >
                <h3>{pokemon.name.toUpperCase()}</h3>
                {pokemon.details && (
                  <>
                    <img
                      src={pokemon.details.sprites.front_default}
                      alt={pokemon.name}
                      className={styles.pokemonAvatar}
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

      {selectedPokemon && (
        <div className={styles.detail}>
          <button
            onClick={onCloseDetails}
            className={styles.closeButton}
            aria-label="Close details"
          >
            ×
          </button>
          <PokemonDetails pokemon={selectedPokemon} />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
