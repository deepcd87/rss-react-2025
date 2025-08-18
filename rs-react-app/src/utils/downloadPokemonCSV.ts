import type { SelectedPokemonItem } from '@/@types/types';

export const downloadPokemonCSV = async (
  selectedPokemon: Record<string, SelectedPokemonItem>
) => {
  const selectedItems = Object.values(selectedPokemon).filter(
    (item) => item.selected
  );

  if (selectedItems.length === 0) {
    console.warn('No Pokémon selected for download');
    return;
  }

  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedPokemon),
    });

    if (!response.ok) {
      throw new Error('Failed to generate CSV');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_pokemon.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download CSV. Please try again.');
  }
};
