'use client';

import { FC, useCallback, useMemo } from 'react';

import { CSVExportButton } from '../../components/core/csv-export/csv-export-button';
import {
  FilterCombobox,
  FilterComboboxDefault,
} from '../../components/core/filter-combobox';
import { useDataTable } from '../../components/core/table/context/data-table-context';
import DataTable from '../../components/core/table/data-table';
import { useModels } from '../../hooks/use-models';
import { useSearchParamsFilter } from '../../hooks/use-search-params-filter';
import { useCentrals } from '../../queries';
import { useFilteredData } from '../../state/filter-store';
import { CentralWithModel, Model } from '../../types/central/central';
import { centralsColumns } from './central-table-columns';
import { CreateCentralButton } from './create-central-button';
import { DeleteCentralModal } from './modal';
import {
  centralsPageActionsStyle,
  centralsPageContainerStyle,
  centralsPageContentStyle,
  centralsPageHeaderStyle,
} from './styles/centrals-page.css';

const TableControls: FC<{
  tableData: CentralWithModel[];
  availableModels: Model[];
}> = ({ tableData, availableModels }) => {
  const { table } = useDataTable();
  const sorting = table.getState().sorting;

  return (
    <>
      <DataTable.Controls>
        <div className={centralsPageActionsStyle}>
          <FilterCombobox.Toggle />
          <CSVExportButton data={tableData} sorting={sorting} />
        </div>
        <DataTable.Search />
        <DataTable.PageSize />
      </DataTable.Controls>

      <FilterComboboxDefault
        data={tableData}
        availableModels={availableModels}
      />
    </>
  );
};

export const CentralTable: FC = () => {
  useSearchParamsFilter();

  const { selectedModels, selectedNames } = useFilteredData();

  const queryParams = useMemo(() => ({}), []);

  const {
    data: centrals,
    isLoading: isLoadingCentrals,
    error: centralsError,
  } = useCentrals(queryParams);
  const {
    data: models,
    isLoading: isLoadingModels,
    error: modelsError,
  } = useModels();

  const handleCreateCentral = useCallback(() => {
    window.location.href = '/centrais/nova-central';
  }, []);

  const tableData = useMemo(() => {
    if (!centrals || !models) return [];

    return centrals.map((central) => {
      const model = models.find((m) => m.id === central.modelId);
      return {
        ...central,
        model: model || { id: 0, name: 'Modelo não encontrado' },
      } as CentralWithModel;
    });
  }, [centrals, models]);

  const filteredTableData = useMemo(() => {
    let filtered = [...tableData];

    if (selectedModels.length > 0) {
      filtered = filtered.filter((central) =>
        selectedModels.includes(central.modelId),
      );
    }

    if (selectedNames.length > 0) {
      filtered = filtered.filter((central) =>
        selectedNames.includes(central.name),
      );
    }

    return filtered;
  }, [tableData, selectedModels, selectedNames]);

  const availableModels = useMemo(() => {
    if (!models || !tableData) return [];

    const usedModelIds = [
      ...new Set(tableData.map((central) => central.modelId)),
    ];
    return models.filter((model) => usedModelIds.includes(model.id));
  }, [models, tableData]);

  const isLoading = isLoadingCentrals || isLoadingModels;
  const error = centralsError || modelsError;

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados: {error.message}</div>;
  }

  return (
    <DeleteCentralModal>
      <div className={centralsPageContainerStyle}>
        <div className={centralsPageHeaderStyle}>
          <CreateCentralButton onClick={handleCreateCentral} />
        </div>
        <div className={centralsPageContentStyle}>
          <DataTable.Root<CentralWithModel>
            columns={centralsColumns}
            data={filteredTableData}
          >
            <TableControls
              tableData={filteredTableData}
              availableModels={availableModels}
            />
            <DataTable.Content />
            {filteredTableData.length > 0 && <DataTable.Pagination />}
          </DataTable.Root>
        </div>
      </div>
    </DeleteCentralModal>
  );
};
