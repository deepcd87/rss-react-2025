import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DownloadFlyout } from './DownloadFlyout';
import { useSelectedPokemonStore } from '../../store/selectedPokemonStore';
import { downloadPokemonCSV } from '../../utils/downloadPokemonCSV';

vi.mock('../../store/selectedPokemonStore');
vi.mock('../../utils/downloadPokemonCSV');

describe('DownloadFlyout', () => {
  const mockClearSelected = vi.fn();
  const mockSelectedPokemon = {
    '1': {
      selected: true,
      data: {
        name: 'bulbasaur',
        url: 'url1',
        details: { id: 1 },
      },
    },
    '2': {
      selected: true,
      data: {
        name: 'ivysaur',
        url: 'url2',
        details: { id: 2 },
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSelectedPokemonStore).mockReturnValue({
      selectedPokemon: mockSelectedPokemon,
      clearSelected: mockClearSelected,
    });
  });

  it('renders when items are selected', () => {
    render(<DownloadFlyout />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unselect all' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' })
    ).toBeInTheDocument();
  });

  it('does not render when no items are selected', () => {
    vi.mocked(useSelectedPokemonStore).mockReturnValue({
      selectedPokemon: {},
      clearSelected: mockClearSelected,
    });

    const { container } = render(<DownloadFlyout />);
    expect(container.firstChild).toBeNull();
  });

  it('calls clearSelected when "Unselect all" button is clicked', () => {
    render(<DownloadFlyout />);

    const unselectButton = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(unselectButton);

    expect(mockClearSelected).toHaveBeenCalledTimes(1);
  });

  it('calls downloadPokemonCSV with selectedPokemon when "Download" button is clicked', () => {
    render(<DownloadFlyout />);

    const downloadButton = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(downloadButton);

    expect(downloadPokemonCSV).toHaveBeenCalledTimes(1);
    expect(downloadPokemonCSV).toHaveBeenCalledWith(mockSelectedPokemon);
  });

  it('shows singular "item" when only one is selected', () => {
    vi.mocked(useSelectedPokemonStore).mockReturnValue({
      selectedPokemon: { '1': mockSelectedPokemon['1'] },
      clearSelected: mockClearSelected,
    });

    render(<DownloadFlyout />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });
});
