import { style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme/theme.css';

export const filtersContainer = style({
  backgroundColor: theme.colors.primarySurface,
  border: `1px solid ${theme.colors.primaryNormal}`,
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
});

export const filtersHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

export const filtersTitle = style({
  fontSize: '16px',
  fontWeight: '600',
  color: theme.colors.primaryForeground,
  margin: 0,
});

export const filtersToggleButton = style({
  background: 'none',
  border: 'none',
  color: theme.colors.success,
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ':hover': {
    color: theme.colors.hoveredSuccess,
  },
});

export const filtersContent = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '16px',

  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const filterLabel = style({
  fontSize: '14px',
  fontWeight: '500',
  color: theme.colors.primaryForeground,
  marginBottom: '4px',
});

export const comboboxContainer = style({
  position: 'relative',
  width: '100%',
});

export const comboboxTrigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '8px 12px',
  backgroundColor: theme.colors.secondarySurface,
  border: `1px solid ${theme.colors.primaryNormal}`,
  borderRadius: '6px',
  fontSize: '14px',
  color: theme.colors.primaryForeground,
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: theme.colors.hoveredOptionBackground,
    borderColor: theme.colors.success,
  },

  ':focus': {
    outline: 'none',
    borderColor: theme.colors.success,
    boxShadow: `0 0 0 2px ${theme.colors.success}33`,
  },
});

export const comboboxTriggerText = style({
  flex: 1,
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const comboboxIcon = style({
  marginLeft: '8px',
  transition: 'transform 0.2s ease',
});

export const comboboxIconOpen = style([
  comboboxIcon,
  {
    transform: 'rotate(180deg)',
  },
]);

export const comboboxDropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 50,
  marginTop: '4px',
  backgroundColor: theme.colors.secondarySurface,
  border: `1px solid ${theme.colors.primaryNormal}`,
  borderRadius: '6px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  maxHeight: '200px',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '6px',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: theme.colors.secondarySurface,
    borderRadius: '3px',
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.primaryNormal,
    borderRadius: '3px',
  },
});

export const comboboxOption = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  fontSize: '14px',
  color: theme.colors.secondaryForeground,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: theme.colors.hoveredOptionBackground,
    color: theme.colors.hoveredSecondaryForeground,
  },
});

export const comboboxOptionSelected = style([
  comboboxOption,
  {
    backgroundColor: theme.colors.success + '20',
    color: theme.colors.success,
    fontWeight: '500',
  },
]);

export const comboboxCheckbox = style({
  width: '16px',
  height: '16px',
  marginRight: '8px',
  accentColor: theme.colors.success,
});

export const comboboxPlaceholder = style({
  color: theme.colors.secondaryForeground,
  fontStyle: 'italic',
});

export const comboboxBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  backgroundColor: theme.colors.success,
  color: theme.colors.primaryForeground,
  fontSize: '12px',
  fontWeight: '600',
  borderRadius: '10px',
  marginLeft: '8px',
});

export const filtersActions = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
  paddingTop: '16px',
  borderTop: `1px solid ${theme.colors.primaryNormal}`,
});

export const filterButton = style({
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
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

export const clearFiltersButton = style([
  filterButton,
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

export const disabledCombobox = style({
  opacity: 0.6,
  cursor: 'not-allowed',

  ':hover': {
    backgroundColor: theme.colors.secondarySurface,
    borderColor: theme.colors.primaryNormal,
  },
});
