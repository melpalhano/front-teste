'use client';

import { FC, useCallback } from 'react';

import { Button } from '../../components/core/button';

interface CreateCentralButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CreateCentralButton: FC<CreateCentralButtonProps> = ({
  onClick,
  className = '',
}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <Button
      onClick={handleClick}
      variant='success'
      size='medium'
      className={className}
      icon='+'
      iconPosition='left'
    >
      Criar Central
    </Button>
  );
};
