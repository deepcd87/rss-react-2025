import { useEffect, useState } from 'react';
import type { EmissionYearData, CountryData } from '../types/types';

type EmissionField = keyof EmissionYearData;

interface Props {
  name: string;
  country: CountryData;
  year: number;
  selectedFields: EmissionField[];
  prevEntry?: EmissionYearData | null;
}

export default function CountryRow({
  name,
  country,
  year,
  selectedFields,
  prevEntry,
}: Props) {
  const current = country.data.find((d) => d.year === year);
  const prev = prevEntry ?? country.data.find((d) => d.year === year - 1);

  const [highlightFields, setHighlightFields] = useState<EmissionField[]>([]);

  useEffect(() => {
    if (!current || !prev) return;

    const changed: EmissionField[] = [];
    if (current.population !== prev.population) changed.push('population');
    if (current.co2 !== prev.co2) changed.push('co2');
    if (current.co2_per_capita !== prev.co2_per_capita)
      changed.push('co2_per_capita');

    selectedFields.forEach((field) => {
      if (current[field] !== prev[field]) {
        changed.push(field);
      }
    });

    setHighlightFields(changed);

    const timer = setTimeout(() => setHighlightFields([]), 1500);
    return () => clearTimeout(timer);
  }, [year, current, prev, selectedFields]);

  if (!current) return null;

  return (
    <tr>
      <td className="px-4 py-2 border">{name}</td>
      <td
        className={`px-4 py-2 border ${
          highlightFields.includes('population') ? 'bg-yellow-100' : ''
        }`}
      >
        {current.population?.toLocaleString() ?? 'N/A'}
      </td>
      <td
        className={`px-4 py-2 border ${
          highlightFields.includes('co2') ? 'bg-yellow-100' : ''
        }`}
      >
        {current.co2 ? (current.co2 / 1_000_000).toFixed(2) : 'N/A'}
      </td>
      <td
        className={`px-4 py-2 border ${
          highlightFields.includes('co2_per_capita') ? 'bg-yellow-100' : ''
        }`}
      >
        {current.co2_per_capita?.toFixed(2) ?? 'N/A'}
      </td>

      {selectedFields.map((field) => (
        <td
          key={field}
          className={`px-4 py-2 border ${
            highlightFields.includes(field) ? 'bg-yellow-100' : ''
          }`}
        >
          {typeof current[field] === 'number'
            ? (current[field] as number).toLocaleString()
            : (current[field] ?? 'N/A')}
        </td>
      ))}
    </tr>
  );
}
