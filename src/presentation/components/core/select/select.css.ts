import { style } from '@vanilla-extract/css';

import { theme } from '../../../components/styles/theme/theme.css';

export const selectContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const selectLabel = style({
  fontSize: '14px',
  fontWeight: '500',
  color: theme.colors.primaryForeground,
});

export const select = style({
  padding: '10px 12px',
  borderRadius: '6px',
  border: `1px solid ${theme.colors.neutral}`,
  fontSize: '14px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  transition: 'border-color 0.2s ease',
  outline: 'none',
  cursor: 'pointer',

  ':focus': {
    borderColor: theme.colors.buttonPrimary,
  },

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const selectError = style({
  borderColor: theme.colors.alert,
});

export const selectErrorMessage = style({
  fontSize: '12px',
  color: theme.colors.alert,
  marginTop: '2px',
});
