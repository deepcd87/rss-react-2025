import type { CO2Data } from '../types/types';
import { REGION_MAP } from './regionMap';
import type { SortOption } from '../types/types';

export function getFilteredData(
  data: CO2Data,
  year: number,
  region: string,
  searchQuery: string,
  sortOption: SortOption
): [string, (typeof data)[string]][] {
  return Object.entries(data)
    .filter(([countryName, country]) => {
      if (region !== 'All' && REGION_MAP[country.iso_code] !== region)
        return false;
      if (
        searchQuery &&
        !countryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort(([aName, aCountry], [bName, bCountry]) => {
      switch (sortOption) {
        case 'name_asc':
          return aName.localeCompare(bName);
        case 'name_desc':
          return bName.localeCompare(aName);
        case 'population_asc': {
          const aPop =
            aCountry.data.find((d) => d.year === year)?.population ?? 0;
          const bPop =
            bCountry.data.find((d) => d.year === year)?.population ?? 0;
          return aPop - bPop;
        }
        case 'population_desc': {
          const aPop =
            aCountry.data.find((d) => d.year === year)?.population ?? 0;
          const bPop =
            bCountry.data.find((d) => d.year === year)?.population ?? 0;
          return bPop - aPop;
        }
      }
    });
}
