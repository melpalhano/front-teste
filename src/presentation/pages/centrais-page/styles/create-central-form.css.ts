import { style } from '@vanilla-extract/css';

import { theme } from '../../../components/styles/theme/theme.css';

export const form = style({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '24px',
  backgroundColor: theme.colors.primarySurface,
  borderRadius: '12px',
  border: `1px solid ${theme.colors.neutral}`,
});

export const formHeader = style({
  marginBottom: '32px',
  textAlign: 'center',
});

export const formTitle = style({
  fontSize: '24px',
  fontWeight: '600',
  color: theme.colors.primaryForeground,
  marginBottom: '8px',
});

export const formDescription = style({
  fontSize: '14px',
  color: theme.colors.secondaryForeground,
  lineHeight: '1.5',
});

export const formFields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '32px',
});

export const formActions = style({
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
});
