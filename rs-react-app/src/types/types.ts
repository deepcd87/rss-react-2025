export interface EmissionYearData {
  year?: number;
  population?: number;
  gdp?: number;
  co2?: number;
  co2_per_capita?: number;
  co2_per_gdp?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
}

export interface CountryData {
  iso_code: string;
  data: EmissionYearData[];
}

export type CO2Data = Record<string, CountryData>;

export interface ExtraFields {
  methane: number;
  oil_co2: number;
  temperature_change_from_co2: number;
}

export type SortOption =
  | 'name_asc'
  | 'name_desc'
  | 'population_asc'
  | 'population_desc';
