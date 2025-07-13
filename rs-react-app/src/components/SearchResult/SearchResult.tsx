import { Component } from 'react';
import type { ResultsProps } from '../../@types/types';
import './SearchResult.css';

class SearchResult extends Component<ResultsProps> {
  state = { hasError: false };

  triggerError = () => {
    this.setState({ hasError: true });
    throw new Error('This is a test error for ErrorBoundary');
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <p>Please try reloading the page.</p>
          <button className="reload-button" onClick={this.handleReload}>
            Reload Page
          </button>
        </div>
      );
    }

    if (this.props.isLoading) {
      return (
        <div className="results-section loading">
          <div className="spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      );
    }

    if (this.props.error) {
      return (
        <div className="results-section error">
          <p>{this.props.error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="error-test-section">
          <button className="error-test-btn " onClick={this.triggerError}>
            Test Error Boundary
          </button>
        </div>

        <div className="results-section">
          {this.props.pokemonList.length === 0 ? (
            <p>No Pokémon found.</p>
          ) : (
            <div className="pokemon-grid">
              {this.props.pokemonList.map((pokemon) => (
                <div key={pokemon.name} className="pokemon-card">
                  <h3>{pokemon.name}</h3>
                  {pokemon.details && (
                    <>
                      <img
                        src={pokemon.details.sprites.front_default}
                        alt={pokemon.name}
                        className="pokemon-avatar"
                      />
                      <p>ID: {pokemon.details.id}</p>
                      <p>
                        Types:{' '}
                        {pokemon.details.types
                          .map((t) => t.type.name)
                          .join(', ')}
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
        </div>
      </>
    );
  }
}

export default SearchResult;
