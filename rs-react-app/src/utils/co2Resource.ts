import { createResource } from './createResource';
import type { CO2Data } from '../types/types';
import { API_URL } from '../types/const';

function fetchCO2Data() {
  return fetch(API_URL).then((res) => {
    if (!res.ok) throw new Error('Failed to load CO₂ data');
    return res.json() as Promise<CO2Data>;
  });
}

let resource: ReturnType<typeof createResource<CO2Data>> | null = null;

export function getCO2Resource() {
  if (!resource) {
    resource = createResource(fetchCO2Data());
  }
  return resource;
}
