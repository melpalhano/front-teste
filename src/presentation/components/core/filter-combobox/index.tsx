'use client';

import { FilterComboboxActions } from './filter-combobox-actions';
import { FilterComboboxContainer } from './filter-combobox-container';
import { FilterComboboxHeader } from './filter-combobox-header';
import { FilterComboboxToggle } from './filter-combobox-toggle';
import { ModelCombobox } from './model-combobox';
import { NameCombobox } from './name-combobox';
import * as styles from './styles/filter-combobox.css';

export const FilterCombobox = {
  Container: FilterComboboxContainer,
  Header: FilterComboboxHeader,
  Toggle: FilterComboboxToggle,
  ModelSelect: ModelCombobox,
  NameSelect: NameCombobox,
  Actions: FilterComboboxActions,
};

interface FilterComboboxDefaultProps {
  data: any[];
  availableModels?: any[];
}

export const FilterComboboxDefault = ({
  data,
  availableModels,
}: FilterComboboxDefaultProps) => (
  <FilterCombobox.Container>
    <FilterCombobox.Header />
    <div className={styles.filtersContent}>
      <FilterCombobox.ModelSelect availableModels={availableModels} />
      <FilterCombobox.NameSelect data={data} />
    </div>
    <FilterCombobox.Actions />
  </FilterCombobox.Container>
);
