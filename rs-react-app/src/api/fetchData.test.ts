import { fetchData } from './fetchData';
import { vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';

describe('fetchData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should return parsed JSON data for successful response', async () => {
    const mockData = { name: 'pikachu', id: 25 };
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchData('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(result).toEqual(mockData);
  });

  it('should throw error when response is not ok', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(
      fetchData('https://pokeapi.co/api/v2/pokemon/invalid')
    ).rejects.toThrow('Pokémon not found');
  });

  it('should throw error when network request fails', async () => {
    const error = new Error('Network error');
    (global.fetch as Mock).mockRejectedValueOnce(error);

    await expect(
      fetchData('https://pokeapi.co/api/v2/pokemon/pikachu')
    ).rejects.toThrow('Network error');
  });
});
