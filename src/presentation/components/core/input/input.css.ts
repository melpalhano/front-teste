import { style } from '@vanilla-extract/css';

import { theme } from '../../../components/styles/theme/theme.css';

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const inputLabel = style({
  fontSize: '14px',
  fontWeight: '500',
  color: theme.colors.primaryForeground,
});

export const input = style({
  padding: '10px 12px',
  borderRadius: '6px',
  border: `1px solid ${theme.colors.neutral}`,
  fontSize: '14px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  transition: 'border-color 0.2s ease',
  outline: 'none',

  ':focus': {
    borderColor: theme.colors.buttonPrimary,
  },

  '::placeholder': {
    color: theme.colors.secondaryForeground,
  },
});

export const inputError = style({
  borderColor: theme.colors.alert,
});

export const inputErrorMessage = style({
  fontSize: '12px',
  color: theme.colors.alert,
  marginTop: '2px',
});
