import { keyframes, style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme/theme.css';

const slideInUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const undoContainer = style({
  position: 'fixed',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10000,
  animation: `${slideInUp} 0.3s ease-out`,

  '@media': {
    'screen and (max-width: 768px)': {
      left: '16px',
      right: '16px',
      transform: 'none',
    },
  },
});

export const undoCard = style({
  backgroundColor: theme.colors.secondarySurface,
  borderRadius: '12px',
  padding: '16px 20px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
  border: `1px solid ${theme.colors.primaryNormal}`,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minWidth: '300px',
  maxWidth: '500px',
});

export const undoContent = style({
  flex: 1,
  color: theme.colors.primaryForeground,
});

export const undoTitle = style({
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '4px',
  color: theme.colors.primaryForeground,
});

export const undoDescription = style({
  fontSize: '12px',
  color: theme.colors.secondaryForeground,
});

export const undoActions = style({
  display: 'flex',
  gap: '8px',
});

export const undoButton = style({
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    transform: 'translateY(-1px)',
  },

  ':active': {
    transform: 'translateY(0)',
  },
});

export const undoButtonPrimary = style([
  undoButton,
  {
    backgroundColor: theme.colors.success,
    color: theme.colors.primaryForeground,

    ':hover': {
      backgroundColor: theme.colors.hoveredSuccess,
    },
  },
]);

export const undoButtonSecondary = style([
  undoButton,
  {
    backgroundColor: 'transparent',
    color: theme.colors.secondaryForeground,
    border: `1px solid ${theme.colors.primaryNormal}`,

    ':hover': {
      backgroundColor: theme.colors.hoveredOptionBackground,
      color: theme.colors.hoveredSecondaryForeground,
    },
  },
]);

export const progressBar = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  backgroundColor: theme.colors.success,
  borderRadius: '0 0 12px 12px',
  animation: 'shrink 5s linear',
});

export const progressBarAnimation = `
  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
