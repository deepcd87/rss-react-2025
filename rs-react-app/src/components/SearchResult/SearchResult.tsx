import { useNavigate } from 'react-router-dom';
import type { ResultsProps } from '../../@types/types';
import styles from './SearchResult.module.css';

const SearchResult = ({
  pokemonList,
  isLoading,
  error,
  currentPage,
  totalPages,
}: ResultsProps) => {
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

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
    <>
      <div className={styles.resultsSection}>
        {pokemonList.length === 0 ? (
          <p>No Pokémon found.</p>
        ) : (
          <div className={styles.pokemonGrid}>
            {pokemonList.map((pokemon) => (
              <div key={pokemon.name} className={styles.pokemonCard}>
                <h3>{pokemon.name}</h3>
                {pokemon.details && (
                  <>
                    <img
                      src={pokemon.details.sprites.front_default}
                      alt={pokemon.name}
                      className={styles.pokemonAvatar}
                    />
                    <p>ID: {pokemon.details.id}</p>
                    <p>
                      Types:{' '}
                      {pokemon.details.types.map((t) => t.type.name).join(', ')}
                    </p>
                    <p>
                      Abilities:{' '}
                      {pokemon.details.abilities
                        .map((a) => a.ability.name)
                        .join(', ')}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination*/}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={styles.paginationButton}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={styles.paginationButton}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
