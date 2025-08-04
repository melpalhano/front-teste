'use client';

import { FC, ReactNode } from 'react';

import { useFilterStore } from '../../../state/filter-store';
import * as styles from './styles/filter-combobox.css';

interface FilterComboboxContainerProps {
  children: ReactNode;
}

export const FilterComboboxContainer: FC<FilterComboboxContainerProps> = ({
  children,
}) => {
  const { isFiltersVisible } = useFilterStore();

  if (!isFiltersVisible) return null;

  return <div className={styles.filtersContainer}>{children}</div>;
};
