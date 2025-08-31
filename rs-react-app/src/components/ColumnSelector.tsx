import { useState } from 'react';
import type { EmissionYearData } from '../types/types';

interface ColumnSelectorProps {
  availableFields: (keyof EmissionYearData)[];
  selectedFields: (keyof EmissionYearData)[];
  onSave: (fields: (keyof EmissionYearData)[]) => void;
  onCancel: () => void;
}

export default function ColumnSelector({
  availableFields,
  selectedFields,
  onSave,
  onCancel,
}: ColumnSelectorProps) {
  const [localSelection, setLocalSelection] =
    useState<(keyof EmissionYearData)[]>(selectedFields);

  const toggleField = (field: keyof EmissionYearData) => {
    setLocalSelection((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Extra Fields</h2>
      <div className="max-h-60 overflow-y-auto space-y-2">
        {availableFields.map((field) => (
          <label key={field} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localSelection.includes(field)}
              onChange={() => toggleField(field)}
              className="h-4 w-4"
            />
            <span>{field}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(localSelection)}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
