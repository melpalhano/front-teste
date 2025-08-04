'use client';

import { FC } from 'react';

import { useFilteredData, useFilterStore } from '../../../state/filter-store';
import * as styles from './styles/filter-combobox.css';

export const FilterComboboxHeader: FC = () => {
  const { toggleFiltersVisibility } = useFilterStore();
  const { hasActiveFilters, selectedModels, selectedNames } = useFilteredData();

  const totalActiveFilters = selectedModels.length + selectedNames.length;

  return (
    <div className={styles.filtersHeader}>
      <h3 className={styles.filtersTitle}>
        Filtros
        {hasActiveFilters && (
          <span className={styles.comboboxBadge}>{totalActiveFilters}</span>
        )}
      </h3>
      <button
        className={styles.filtersToggleButton}
        onClick={toggleFiltersVisibility}
        type='button'
      >
        Ocultar Filtros
      </button>
    </div>
  );
};
