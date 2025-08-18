import type { SelectedPokemonItem } from '@/@types/types';

export const generatePokemonCSV = (
  selectedPokemon: Record<string, SelectedPokemonItem>
): string => {
  const selectedItems = Object.values(selectedPokemon).filter(
    (item) => item.selected
  );

  if (selectedItems.length === 0) {
    throw new Error('No Pokémon selected for CSV generation');
  }

  const headers = [
    'Name',
    'ID',
    'Types',
    'Abilities',
    'Height',
    'Weight',
    'URL',
  ];

  const rows = selectedItems.map(({ data }) => {
    const details = data.details;
    return [
      `"${data.name}"`,
      details?.id.toString() ?? '',
      details?.types
        ? `"${details.types.map((t) => t.type.name).join(', ')}"`
        : '',
      details?.abilities
        ? `"${details.abilities.map((a) => a.ability.name).join(', ')}"`
        : '',
      details?.height.toString() ?? '',
      details?.weight.toString() ?? '',
      data.url,
    ];
  });

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};
