'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../components/core/button';
import { PenToSquareIcon } from '../../components/icons/pen-to-square';

interface EditCentralButtonProps {
  centralId: number;
}

export const EditCentralButton = ({ centralId }: EditCentralButtonProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/centrais/editar/${centralId}`);
  };

  return (
    <Button
      onClick={handleEdit}
      variant='primary'
      size='small'
      icon={<PenToSquareIcon customSize='12px' />}
      iconPosition='left'
    >
      Editar
    </Button>
  );
};
