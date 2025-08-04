'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CentralWithModel } from '../../types/central/central';
import { DeleteCentralButton } from './modal/delete-central-modal';

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
    cell: ({ row }) => (
      <div style={{ textAlign: 'center' }}>
        <DeleteCentralButton central={row.original} />
      </div>
    ),
    enableSorting: false,
    enableGlobalFilter: false,
  },
];
