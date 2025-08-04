'use client';

import { FC, useCallback, useMemo, useState } from 'react';

import DataTable from '../../components/core/table/data-table';
import { useModels } from '../../hooks/use-models';
import { useCentrals } from '../../queries';
import { CentralWithModel } from '../../types/central/central';
import { centralsColumns } from './central-table-columns';
import { CreateCentralButton } from './create-central-button';
import { DeleteCentralModal } from './modal';
import {
  centralsPageContainerStyle,
  centralsPageContentStyle,
  centralsPageHeaderStyle,
} from './styles/centrals-page.css';

export const CentralTable: FC = () => {
  const [searchTerm] = useState('');

  const queryParams = useMemo(
    () => ({
      search: searchTerm || undefined,
    }),
    [searchTerm],
  );

  const { data: centrals, isLoading: isLoadingCentrals, error: centralsError } = useCentrals(queryParams);
  const { data: models, isLoading: isLoadingModels, error: modelsError } = useModels();

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
          <DataTable.Root<CentralWithModel> columns={centralsColumns} data={tableData}>
            <DataTable.Controls>
              <DataTable.Search />
              <DataTable.PageSize />
            </DataTable.Controls>

            <DataTable.Content />

            {tableData.length > 0 && <DataTable.Pagination />}
          </DataTable.Root>
        </div>
      </div>
    </DeleteCentralModal>
  );
};
