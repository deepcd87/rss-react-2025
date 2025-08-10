export async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      response.status === 404 ? 'Pokémon not found' : 'Failed to fetch data'
    );
  }
  return response.json();
}
