// src/utils/downloadPokemonCSV.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadPokemonCSV } from './downloadPokemonCSV';
import type { SelectedPokemonItem, Pokemon } from '../@types/types';

// Mock Blob globally
global.Blob = vi.fn((content: never, options: never) => ({ content, options }));

describe('downloadPokemonCSV', () => {
  // Mock data
  const mockPokemon1: Pokemon = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    details: {
      id: 25,
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      height: 4,
      weight: 60,
      sprites: { front_default: '' },
      stats: [],
    },
  };

  const mockPokemon2: Pokemon = {
    name: 'Charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/',
    details: {
      id: 6,
      types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
      abilities: [{ ability: { name: 'blaze' } }],
      height: 17,
      weight: 905,
      sprites: { front_default: '' },
      stats: [],
    },
  };

  const mockSelectedPokemon: Record<string, SelectedPokemonItem> = {
    '25': { selected: true, data: mockPokemon1 },
    '6': { selected: true, data: mockPokemon2 },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();

    document.createElement = vi.fn(() => ({
      href: '',
      download: '',
      click: vi.fn(),
    })) as never;
    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();
  });

  it('should create a download link with correct CSV content', () => {
    downloadPokemonCSV(mockSelectedPokemon);

    expect(Blob).toHaveBeenCalledWith(expect.any(Array), {
      type: 'text/csv;charset=utf-8;',
    });

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('should generate correct CSV headers and rows', () => {
    downloadPokemonCSV(mockSelectedPokemon);

    const blobContent = (Blob as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0][0];
    const lines = blobContent.split('\n');

    expect(lines[0]).toBe('Name,ID,Types,Abilities,Height,Weight,URL');

    expect(blobContent).toContain('"Pikachu"');
    expect(blobContent).toContain('"electric"');
    expect(blobContent).toContain('"Charizard"');
    expect(blobContent).toContain('"fire, flying"');
  });

  it('should name the file with correct count of selected items', () => {
    downloadPokemonCSV(mockSelectedPokemon);

    const createdAnchor = (document.createElement as ReturnType<typeof vi.fn>)
      .mock.results[0].value;
    expect(createdAnchor.download).toBe('2_pokemon.csv');
  });

  it('should handle pokemon with missing details gracefully', () => {
    const pokemonWithMissingDetails = {
      '999': {
        selected: true,
        data: {
          name: 'MissingNo',
          url: 'invalid-url',
          details: undefined,
        },
      },
    };

    downloadPokemonCSV(pokemonWithMissingDetails as never);

    const blobContent = (Blob as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0][0];
    const lines = blobContent.split('\n');

    expect(lines[1]).toBe('"MissingNo",,,,,,invalid-url');
  });

  it('should not attempt download when no items are selected', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    downloadPokemonCSV({});

    expect(consoleWarn).toHaveBeenCalledWith(
      'No Pokémon selected for download'
    );
    expect(document.createElement).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });

  it('should properly escape CSV values', () => {
    const pokemonWithComma = {
      '1': {
        selected: true,
        data: {
          ...mockPokemon1,
          name: 'Pikachu, Jr.',
          details: {
            ...mockPokemon1.details,
            abilities: [
              { ability: { name: 'static, zap' } },
              { ability: { name: 'lightning rod' } },
            ],
          },
        },
      },
    };

    downloadPokemonCSV(pokemonWithComma);

    const blobContent = (Blob as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][0][0];
    expect(blobContent).toContain('"Pikachu, Jr."');
    expect(blobContent).toContain('"static, zap, lightning rod"');
  });
});
