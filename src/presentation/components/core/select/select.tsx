'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';

import * as styles from './select.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className={styles.selectContainer}>
        {label && <label className={styles.selectLabel}>{label}</label>}
        <select
          ref={ref}
          className={`${styles.select} ${error ? styles.selectError : ''} ${
            className || ''
          }`}
          {...props}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.selectErrorMessage}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
