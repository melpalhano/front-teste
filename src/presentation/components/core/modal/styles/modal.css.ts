import { keyframes, style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme/theme.css';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const modalContent = style({
  backgroundColor: theme.colors.primarySurface,
  borderRadius: '12px',
  padding: '24px',
  width: '90%',
  maxWidth: '400px',
  margin: '0 16px',
  boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
  border: `1px solid ${theme.colors.neutral}`,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const modalHeader = style({
  marginBottom: '20px',
});

export const modalTitle = style({
  fontSize: '20px',
  fontWeight: '600',
  color: theme.colors.primaryForeground,
  marginBottom: '8px',
  margin: 0,
});

export const modalDescription = style({
  fontSize: '14px',
  color: theme.colors.secondaryForeground,
  lineHeight: '1.5',
  margin: 0,
});

export const modalFooter = style({
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  marginTop: '24px',
});

export const modalButton = style({
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const modalButtonCancel = style([
  modalButton,
  {
    backgroundColor: theme.colors.secondarySurface,
    color: theme.colors.secondaryForeground,
    border: `1px solid ${theme.colors.neutral}`,
    ':hover': {
      backgroundColor: theme.colors.hoveredOptionBackground,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
  },
]);

export const modalButtonConfirm = style([
  modalButton,
  {
    backgroundColor: theme.colors.alert,
    color: theme.colors.primaryForeground,
    ':hover': {
      backgroundColor: theme.colors.hoveredAlert,
    },
    ':active': {
      transform: 'scale(0.98)',
    },
    ':disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
]);

export const modalButtonText = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
