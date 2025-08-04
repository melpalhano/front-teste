import { theme } from '@components/styles/theme/theme.css';
import { style } from '@vanilla-extract/css';

export const pageContainerStyle = style({
  padding: '24px',
  width: '100%',
});

export const centralsContainerStyle = style({
  maxWidth: '1200px',
  width: '100%',
  padding: '24px',
  backgroundColor: theme.colors.primarySurface,
  boxShadow: `0 2px 8px ${theme.colors.shadowLight}`,
});
