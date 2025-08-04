'use client';

import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import { useFilteredData } from '../../../state/filter-store';
import { CentralWithModel } from '../../../types/central/central';
import { downloadCSV, prepareDataForExport } from '../../../utils/csv-export';
import { Button } from '../button';

interface CSVExportButtonProps {
  data: CentralWithModel[];
  sorting?: { id: string; desc: boolean }[];
  disabled?: boolean;
  className?: string;
}

export const CSVExportButton: FC<CSVExportButtonProps> = ({
  data,
  sorting,
  disabled = false,
  className,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { selectedModels, selectedNames } = useFilteredData();

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const filteredData = prepareDataForExport(
        data,
        { selectedModels, selectedNames },
        sorting,
      );

      if (filteredData.length === 0) {
        toast.warning('Nenhum dado para exportar com os filtros atuais', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `centrals-export-${currentDate}.csv`;

      downloadCSV(filteredData, filename);

      toast.success(`${filteredData.length} centrais exportadas com sucesso!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      toast.error('Erro ao exportar dados para CSV', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting || data.length === 0}
      variant='secondary'
      size='small'
      className={className}
    >
      {isExporting ? 'Exportando...' : 'Exportar CSV'}
    </Button>
  );
};
