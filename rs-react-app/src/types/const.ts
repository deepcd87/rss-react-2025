import type { EmissionYearData } from './types';

export const API_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const EXTRA_FIELDS: (keyof EmissionYearData)[] = [
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
];
