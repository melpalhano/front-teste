'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Button } from '../../components/core/button';
import { TrashIcon } from '../../components/icons/trash';
import { CentralWithModel } from '../../types/central/central';

export const centralsColumns: ColumnDef<CentralWithModel>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'model.name',
    header: 'Modelo',
    cell: ({ row }) => <div>{row.original.model.name}</div>,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'mac',
    header: 'MAC',
    cell: ({ row }) => <div>{row.getValue('mac')}</div>,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row: _row }) => (
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={() => {}}
          variant='danger'
          size='small'
          icon={<TrashIcon customSize='12px' />}
          iconPosition='left'
        >
          Deletar
        </Button>
      </div>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
];
