import { useMemo } from 'react';
import { getCO2Resource } from '../utils/co2Resource';
import CountryRow from './CountryRow';
import type { EmissionYearData, SortOption } from '../types/types';
import { getFilteredData } from '../utils/getFilteredData';

interface Props {
  year: number;
  selectedFields: (keyof EmissionYearData)[];
  region: string;
  searchQuery: string;
  sortOption: SortOption;
}

export default function CountryList({
  year,
  selectedFields,
  region,
  searchQuery,
  sortOption,
}: Props) {
  const co2Resource = getCO2Resource();
  const data = co2Resource.read();

  const prevEntriesRef = useMemo(() => {
    const map: Record<string, EmissionYearData | null> = {};
    Object.entries(data).forEach(([name, country]) => {
      map[name] = country.data.find((d) => d.year === year - 1) ?? null;
    });
    return map;
  }, [data, year]);

  const filteredData = useMemo(
    () => getFilteredData(data, year, region, searchQuery, sortOption),
    [data, year, region, searchQuery, sortOption]
  );

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Country</th>
          <th className="border px-4 py-2">Population</th>
          <th className="border px-4 py-2">CO₂ (Mt)</th>
          <th className="border px-4 py-2">CO₂ per Capita</th>
          {selectedFields.map((field) => (
            <th key={field as string} className="border px-4 py-2">
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map(([name, country]) => (
          <CountryRow
            key={`${country.iso_code || name}-${year}`}
            name={name}
            country={country}
            year={year}
            prevEntry={prevEntriesRef[name]}
            selectedFields={selectedFields}
          />
        ))}
      </tbody>
    </table>
  );
}
