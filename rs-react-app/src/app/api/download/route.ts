import { NextResponse } from 'next/server';
import { generatePokemonCSV } from '../../../utils/generatePokemonCSV';
import type { SelectedPokemonItem } from '@/@types/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const selectedPokemon: Record<string, SelectedPokemonItem> =
      await request.json();

    const csvContent = generatePokemonCSV(selectedPokemon);
    const fileName = `pokemon_${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('CSV generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
