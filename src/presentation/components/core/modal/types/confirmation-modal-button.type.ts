import { BaseButtonWithClassNameProps } from './base.type';

export interface ConfirmationModalButtonProps
  extends BaseButtonWithClassNameProps {
  variant: 'cancel' | 'confirm';
}
