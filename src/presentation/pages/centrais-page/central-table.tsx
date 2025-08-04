'use client';

import { FC, useCallback, useMemo, useState } from 'react';

import DataTable from '../../components/core/table/data-table';
import { useCentrals } from '../../queries';
import { centralsColumns } from './central-table-columns';
import { CreateCentralButton } from './create-central-button';
import * as styles from './styles/centrals-page.css';

export const CentralTable: FC = () => {
  const [searchTerm] = useState('');

  const queryParams = useMemo(
    () => ({
      search: searchTerm || undefined,
    }),
    [searchTerm],
  );

  const { data, isLoading, error } = useCentrals(queryParams);

  const handleCreateCentral = useCallback(() => {}, []);

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
    <div className={styles.centralsPageContainerStyle}>
      <div className={styles.centralsPageHeaderStyle}>
        <CreateCentralButton onClick={handleCreateCentral} />
      </div>
      <div className={styles.centralsPageContentStyle}>
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
  );
};
