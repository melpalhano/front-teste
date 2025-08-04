import { ReactNode } from 'react';

export interface BaseChildrenProps {
  children: ReactNode;
}

export interface BaseWithClassNameProps extends BaseChildrenProps {
  className?: string;
}

export interface BaseButtonProps extends BaseChildrenProps {
  onClick?: () => void;
  disabled?: boolean;
}

export interface BaseButtonWithClassNameProps extends BaseButtonProps {
  className?: string;
}
