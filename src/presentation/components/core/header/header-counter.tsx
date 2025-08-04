import { FC } from 'react';

import { useCentralStore } from '../../../state/central-store';
import {
  counterLabelStyle,
  counterLoadingStyle,
  counterValueStyle,
  headerCounterStyle,
} from './styles/header-counter.css';

interface HeaderCounterProps {
  className?: string;
}

export const HeaderCounter: FC<HeaderCounterProps> = ({ className }) => {
  const { totalCentrals, isLoading } = useCentralStore();

  return (
    <div className={`${headerCounterStyle} ${className || ''}`}>
      <span className={counterLabelStyle}>Total de Centrais:</span>
      <span
        className={`${counterValueStyle} ${
          isLoading ? counterLoadingStyle : ''
        }`}
      >
        {isLoading ? '...' : totalCentrals}
      </span>
    </div>
  );
};
