'use client';

import { FC } from 'react';

import { useFilteredData, useFilterStore } from '../../../state/filter-store';
import * as styles from './styles/filter-combobox.css';

export const FilterComboboxActions: FC = () => {
  const { clearFilters } = useFilterStore();
  const { hasActiveFilters } = useFilteredData();

  if (!hasActiveFilters) return null;

  return (
    <div className={styles.filtersActions}>
      <button
        className={styles.clearFiltersButton}
        onClick={clearFilters}
        type='button'
      >
        Limpar Todos os Filtros
      </button>
    </div>
  );
};
