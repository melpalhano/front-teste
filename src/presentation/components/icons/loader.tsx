'use client';

import { FC } from 'react';

interface LoaderIconProps {
  size?: string;
  className?: string;
}

export const LoaderIcon: FC<LoaderIconProps> = ({
  size = '16px',
  className = '',
}) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeDasharray='31.416'
        strokeDashoffset='31.416'
        style={{
          animation: 'spin 1s linear infinite',
        }}
      />
    </svg>
  );
};
