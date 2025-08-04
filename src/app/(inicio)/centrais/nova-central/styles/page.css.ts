import { style } from '@vanilla-extract/css';

import { theme } from '../../../../../presentation/components/styles/theme/theme.css';

export const container = style({
  minHeight: '100vh',
  padding: '24px',
  backgroundColor: theme.colors.background,
});
