'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

import * as styles from './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ''} ${
            className || ''
          }`}
          {...props}
        />
        {error && <span className={styles.inputErrorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
