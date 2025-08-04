import { theme } from '@components/styles/theme/theme.css';
import { style } from '@vanilla-extract/css';

export const dataTableRootStyle = style({
  width: '100%',
  backgroundColor: 'transparent',
});

export const dataTableContentStyle = style({
  borderRadius: '8px',
  border: `1px solid ${theme.colors.neutral}`,
  backgroundColor: theme.colors.primarySurface,
  overflow: 'hidden',
  maxHeight: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
});

export const dataTableWrapperStyle = style({
  width: '100%',
  overflowX: 'auto',
  overflowY: 'auto',
  borderRadius: '8px',
  flex: '1',
  minHeight: '0',
});

export const dataTableStyle = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '12px',
    },
  },
});

export const dataTableHeaderStyle = style({
  backgroundColor: theme.colors.hoveredOptionBackground,
  borderBottom: `1px solid ${theme.colors.neutral}`,
  position: 'sticky',
  top: '0',
  zIndex: '1',
});

export const dataTableHeaderCellStyle = style({
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '600',
  color: theme.colors.primaryForeground,
  fontSize: '14px',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '8px 6px',
      fontSize: '12px',
    },
  },
});

export const dataTableHeaderSortableStyle = style({
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: theme.colors.hoveredOptionBackground,
  },
});

export const dataTableHeaderContentStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
});

export const dataTableHeaderSortIconStyle = style({
  fontSize: '12px',
  color: theme.colors.secondaryForeground,
  transition: 'color 0.2s ease',
});

export const dataTableBodyStyle = style({
  backgroundColor: theme.colors.primarySurface,
});

export const dataTableRowStyle = style({
  borderBottom: `1px solid ${theme.colors.neutral}`,
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: theme.colors.hoveredOptionBackground,
  },
  ':last-child': {
    borderBottom: 'none',
  },
});

export const dataTableRowEvenStyle = style({
  backgroundColor: theme.colors.tableRowEven,
});

export const dataTableRowOddStyle = style({
  backgroundColor: theme.colors.tableRowOdd,
});

export const dataTableCellStyle = style({
  padding: '12px 16px',
  color: theme.colors.primaryForeground,
  fontSize: '14px',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '8px 6px',
      fontSize: '12px',
    },
  },
});

export const dataTableEmptyStyle = style({
  padding: '24px',
  textAlign: 'center',
  color: theme.colors.secondaryForeground,
  fontSize: '14px',
});

export const dataTableControlsStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  gap: '16px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '12px',
    },
  },
});

export const dataTableSearchStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flex: '1',
  maxWidth: '450px',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});

export const dataTableSearchLabelStyle = style({
  fontWeight: '500',
  color: theme.colors.primaryForeground,
  fontSize: '14px',
  whiteSpace: 'nowrap',
});

export const dataTableSearchInputStyle = style({
  flex: '1',
  padding: '8px 12px',
  border: `1px solid ${theme.colors.neutral}`,
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ':focus': {
    outline: 'none',
    borderColor: theme.colors.success,
    boxShadow: `0 0 0 2px ${theme.colors.shadowFocus}`,
  },
  '::placeholder': {
    color: theme.colors.secondaryForeground,
  },
});

export const dataTablePageSizeStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const dataTablePageSizeLabelStyle = style({
  fontWeight: '500',
  color: theme.colors.primaryForeground,
  fontSize: '14px',
  whiteSpace: 'nowrap',
});

export const dataTablePageSizeSelectStyle = style({
  padding: '8px 12px',
  border: `1px solid ${theme.colors.neutral}`,
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  minWidth: '80px',
  ':focus': {
    outline: 'none',
    borderColor: theme.colors.success,
    boxShadow: `0 0 0 2px ${theme.colors.shadowFocus}`,
  },
});

export const dataTablePaginationStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
  flexWrap: 'wrap',
});

export const dataTablePaginationButtonStyle = style({
  padding: '8px 12px',
  border: `1px solid ${theme.colors.neutral}`,
  borderRadius: '6px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  minWidth: '40px',
  textAlign: 'center',
  ':hover': {
    backgroundColor: theme.colors.hoveredOptionBackground,
    borderColor: theme.colors.success,
  },
  ':disabled': {
    backgroundColor: theme.colors.primarySurface,
    color: theme.colors.secondaryForeground,
    cursor: 'not-allowed',
    borderColor: theme.colors.neutral,
    opacity: '0.5',
  },
});

export const dataTablePaginationButtonActiveStyle = style({
  backgroundColor: theme.colors.success,
  borderColor: theme.colors.success,
  color: theme.colors.primarySurface,
  ':hover': {
    backgroundColor: theme.colors.hoveredSuccess,
    borderColor: theme.colors.hoveredSuccess,
  },
});

export const dataTablePaginationInfoStyle = style({
  color: theme.colors.secondaryForeground,
  fontSize: '14px',
  margin: '0 16px',
});

export const dataTableExportStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const dataTableExportSelectStyle = style({
  padding: '8px 12px',
  border: `1px solid ${theme.colors.neutral}`,
  borderRadius: '6px',
  fontSize: '14px',
  backgroundColor: theme.colors.primarySurface,
  color: theme.colors.primaryForeground,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  minWidth: '110px',
  ':focus': {
    outline: 'none',
    borderColor: theme.colors.success,
  },
});
