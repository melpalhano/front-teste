import { theme } from '@components/styles/theme/theme.css';
import { style } from '@vanilla-extract/css';

const buttonBaseStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.colors.shadowFocus}`,
  },
  ':disabled': {
    opacity: '0.6',
    cursor: 'not-allowed',
  },
});

export const buttonPrimaryStyle = style([
  buttonBaseStyle,
  {
    backgroundColor: theme.colors.buttonPrimary,
    color: theme.colors.buttonPrimaryText,
    ':hover': {
      backgroundColor: theme.colors.buttonPrimaryHover,
    },
  },
]);

export const buttonSecondaryStyle = style([
  buttonBaseStyle,
  {
    backgroundColor: 'transparent',
    color: theme.colors.primaryForeground,
    border: `1px solid ${theme.colors.neutral}`,
    ':hover': {
      backgroundColor: theme.colors.hoveredOptionBackground,
    },
  },
]);

export const buttonDangerStyle = style([
  buttonBaseStyle,
  {
    backgroundColor: theme.colors.stateError,
    color: 'white',
    ':hover': {
      backgroundColor: '#c82333',
    },
  },
]);

export const buttonSuccessStyle = style([
  buttonBaseStyle,
  {
    backgroundColor: theme.colors.success,
    color: 'white',
    ':hover': {
      backgroundColor: theme.colors.hoveredSuccess,
    },
  },
]);

export const buttonSmallStyle = style({
  padding: '6px 12px',
  fontSize: '12px',
  minHeight: '32px',
});

export const buttonMediumStyle = style({
  padding: '8px 16px',
  fontSize: '14px',
  minHeight: '40px',
});

export const buttonLargeStyle = style({
  padding: '12px 24px',
  fontSize: '16px',
  minHeight: '48px',
});

export const buttonIconStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
