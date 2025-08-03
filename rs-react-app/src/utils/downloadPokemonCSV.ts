import type { SelectedPokemonItem } from '../@types/types';

export const downloadPokemonCSV = (
  selectedPokemon: Record<string, SelectedPokemonItem>
) => {
  const selectedItems = Object.values(selectedPokemon).filter(
    (item) => item.selected
  );

  if (selectedItems.length === 0) {
    console.warn('No Pokémon selected for download');
    return;
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
  const rows = selectedItems.map(({ data }) => [
    `"${data.name}"`,
    data.details?.id,
    `"${data.details?.types.map((t) => t.type.name).join(', ')}"`,
    `"${data.details?.abilities.map((a) => a.ability.name).join(', ')}"`,
    data.details?.height,
    data.details?.weight,
    data.url,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedItems.length}_pokemon.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
