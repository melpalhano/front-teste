import { CentralWithModel } from '../types/central/central';

interface CSVColumn {
  key: keyof CentralWithModel | string;
  header: string;
  formatter?: (value: any, row: CentralWithModel) => string;
}

const CSV_COLUMNS: CSVColumn[] = [
  { key: 'name', header: 'Nome' },
  { key: 'mac', header: 'MAC' },
  {
    key: 'model',
    header: 'Modelo',
    formatter: (value: any, row: CentralWithModel) => row.model.name,
  },
];

export function convertToCSV(
  data: CentralWithModel[],
  columns = CSV_COLUMNS,
): string {
  if (data.length === 0) return '';
  const headers = columns.map((col) => col.header).join(',');
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        let value: any;

        if (col.formatter) {
          value = col.formatter(null, row);
        } else if (typeof col.key === 'string' && col.key.includes('.')) {
          const keys = col.key.split('.');
          value = keys.reduce((obj, key) => obj?.[key], row as any);
        } else {
          value = row[col.key as keyof CentralWithModel];
        }

        return escapeCsvValue(String(value || ''));
      })
      .join(',');
  });

  return [headers, ...rows].join('\n');
}

function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCSV(
  data: CentralWithModel[],
  filename?: string,
  columns = CSV_COLUMNS,
): void {
  const csv = convertToCSV(data, columns);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const currentDate = new Date().toISOString().split('T')[0];
  const finalFilename = filename || `centrals-export-${currentDate}.csv`;

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', finalFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function prepareDataForExport(
  data: CentralWithModel[],
  filters: {
    selectedModels: number[];
    selectedNames: string[];
  },
  sorting?: { id: string; desc: boolean }[],
): CentralWithModel[] {
  let filteredData = [...data];

  if (filters.selectedModels.length > 0) {
    filteredData = filteredData.filter((central) =>
      filters.selectedModels.includes(central.modelId),
    );
  }

  if (filters.selectedNames.length > 0) {
    filteredData = filteredData.filter((central) =>
      filters.selectedNames.includes(central.name),
    );
  }

  if (sorting && sorting.length > 0) {
    const sortConfig = sorting[0];
    filteredData.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortConfig.id.includes('.')) {
        const keys = sortConfig.id.split('.');
        aValue = keys.reduce((obj, key) => obj?.[key], a as any);
        bValue = keys.reduce((obj, key) => obj?.[key], b as any);
      } else {
        aValue = (a as any)[sortConfig.id];
        bValue = (b as any)[sortConfig.id];
      }

      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();

      let comparison = 0;
      if (aStr > bStr) comparison = 1;
      if (aStr < bStr) comparison = -1;

      return sortConfig.desc ? -comparison : comparison;
    });
  }

  return filteredData;
}
