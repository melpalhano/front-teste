'use client';

import { FC, useCallback, useMemo, useState } from 'react';

import DataTable from '../../components/core/table/data-table';
import { useCentrals } from '../../queries';
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

  const { data, isLoading, error } = useCentrals(queryParams);

  const handleCreateCentral = useCallback(() => {
    window.location.href = '/centrais/nova-central';
  }, []);

  const tableData = useMemo(() => {
    return data?.data || [];
  }, [data]);

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
          <DataTable.Root columns={centralsColumns} data={tableData}>
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
