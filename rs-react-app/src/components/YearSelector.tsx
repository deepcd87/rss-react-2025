import { useMemo } from 'react';
import { getCO2Resource } from '../utils/co2Resource';

interface YearSelectorProps {
  year: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function YearSelector({ year, onChange }: YearSelectorProps) {
  const co2Resource = getCO2Resource();
  const data = co2Resource.read();

  const years = useMemo(() => {
    const yearSet = new Set<number>();

    for (const country of Object.values(data)) {
      country.data.forEach((entry) => {
        if (entry.year != null) {
          yearSet.add(entry.year);
        }
      });
    }

    return Array.from(yearSet).sort((a, b) => a - b);
  }, [data]);

  return (
    <div>
      <label className="font-semibold mr-2">Year:</label>
      <select
        value={year}
        onChange={onChange}
        className="px-3 py-2 border rounded-lg"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
