import { theme } from '@components/styles/theme/theme.css';
import { style } from '@vanilla-extract/css';

export const centralsPageContainerStyle = style({
  padding: '24px',
  width: '100%',
});

export const centralsPageHeaderStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  padding: '0 16px',
});

export const centralsPageTitleStyle = style({
  margin: 0,
  fontSize: '24px',
  fontWeight: '600',
  color: theme.colors.primaryForeground,
});

export const centralsPageContentStyle = style({
  maxWidth: '1200px',
  width: '100%',
  padding: '24px',
  backgroundColor: theme.colors.primarySurface,
  borderRadius: '8px',
});

export const centralsPageActionsStyle = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});
