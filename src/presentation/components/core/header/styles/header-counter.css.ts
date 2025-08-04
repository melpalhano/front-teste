import { style } from '@vanilla-extract/css';

export const headerCounterStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  border: '1px solid #e9ecef',
  fontSize: '14px',
  fontWeight: '500',
  color: '#495057',
});

export const counterLabelStyle = style({
  color: '#6c757d',
  fontWeight: '400',
});

export const counterValueStyle = style({
  color: '#495057',
  fontWeight: '600',
  fontSize: '16px',
});

export const counterLoadingStyle = style({
  color: '#adb5bd',
  fontStyle: 'italic',
});
