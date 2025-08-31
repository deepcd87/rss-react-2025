import { useCallback } from 'react';
import { Suspense, useState } from 'react';
import { Spinner } from './components/UI/Spinner';
import CountryList from './components/CountryList';
import YearSelector from './components/YearSelector';
import Modal from './components/UI/Modal';
import ColumnSelector from './components/ColumnSelector';
import { REGION_MAP } from './utils/regionMap';
import type { SortOption, EmissionYearData } from './types/types';
import { EXTRA_FIELDS } from './types/const';

function App() {
  const [selectedFields, setSelectedFields] = useState<
    (keyof EmissionYearData)[]
  >([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [year, setYear] = useState<number>(2023);
  const [region, setRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  const regions = ['All', ...new Set(Object.values(REGION_MAP))];

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setYear(Number(e.target.value));
    },
    []
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegion(e.target.value);
    },
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOption(e.target.value as SortOption);
    },
    []
  );

  const handleColumnSave = useCallback((fields: (keyof EmissionYearData)[]) => {
    setSelectedFields(fields);
    setModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => setModalOpen(true), []);
  const handleModalClose = useCallback(() => setModalOpen(false), []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        CO₂ Emissions by Country
      </h1>
      <Suspense
        fallback={
          <div className="flex justify-center mt-10">
            <Spinner />
          </div>
        }
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <YearSelector year={year} onChange={handleYearChange} />

          <div>
            <label className="font-semibold mr-2">Region:</label>
            <select
              value={region}
              onChange={handleRegionChange}
              className="px-3 py-2 border rounded-lg"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold mr-2">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Country name..."
              className="px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold mr-2">Sort:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="population_asc">Population (Ascending)</option>
              <option value="population_desc">Population (Descending)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleModalOpen}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Select Columns
          </button>
        </div>

        <CountryList
          year={year}
          selectedFields={selectedFields}
          region={region}
          searchQuery={searchQuery}
          sortOption={sortOption}
        />

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ColumnSelector
            availableFields={EXTRA_FIELDS}
            selectedFields={selectedFields}
            onSave={handleColumnSave}
            onCancel={handleModalClose}
          />
        </Modal>
      </Suspense>
    </div>
  );
}

export default App;
