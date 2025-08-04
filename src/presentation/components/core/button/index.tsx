'use client';

import { FC, ReactNode, useCallback } from 'react';

import * as styles from './styles.css';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
}) => {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimaryStyle;
      case 'secondary':
        return styles.buttonSecondaryStyle;
      case 'danger':
        return styles.buttonDangerStyle;
      case 'success':
        return styles.buttonSuccessStyle;
      default:
        return styles.buttonPrimaryStyle;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmallStyle;
      case 'large':
        return styles.buttonLargeStyle;
      default:
        return styles.buttonMediumStyle;
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    return <span className={styles.buttonIconStyle}>{icon}</span>;
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${getVariantStyle()} ${getSizeStyle()} ${className}`}
    >
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </button>
  );
};
