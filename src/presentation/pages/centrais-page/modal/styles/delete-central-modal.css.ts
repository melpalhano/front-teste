import { style } from '@vanilla-extract/css';

import { theme } from '../../../../components/styles/theme/theme.css';

export const deleteModalTitle = style({
  fontWeight: '700',
});

export const deleteModalDescription = style({
  color: theme.colors.secondaryForeground,
  fontSize: '14px',
  lineHeight: '1.6',
});

export const deleteModalButtonConfirm = style({
  backgroundColor: theme.colors.alert,
  color: theme.colors.primaryForeground,
  ':hover': {
    backgroundColor: theme.colors.hoveredAlert,
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});
