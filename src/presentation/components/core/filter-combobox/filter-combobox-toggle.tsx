'use client';

import { FC } from 'react';

import { useFilteredData, useFilterStore } from '../../../state/filter-store';
import * as styles from './styles/filter-combobox.css';

export const FilterComboboxToggle: FC = () => {
  const { toggleFiltersVisibility, isFiltersVisible } = useFilterStore();
  const { hasActiveFilters, selectedModels, selectedNames } = useFilteredData();

  const totalActiveFilters = selectedModels.length + selectedNames.length;

  return (
    <button
      className={styles.filtersToggleButton}
      onClick={toggleFiltersVisibility}
      type='button'
    >
      {isFiltersVisible ? 'Ocultar' : 'Mostrar'} Filtros
      {hasActiveFilters && (
        <span className={styles.comboboxBadge}>{totalActiveFilters}</span>
      )}
    </button>
  );
};
