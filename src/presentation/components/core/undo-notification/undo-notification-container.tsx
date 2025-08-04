'use client';

import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useUndoStore } from '../../../state/undo-store';
import * as styles from './styles/undo-notification.css';

interface UndoNotificationContainerProps {
  children: ReactNode;
}

export const UndoNotificationContainer: FC<UndoNotificationContainerProps> = ({
  children,
}) => {
  const { isVisible } = useUndoStore();

  if (!isVisible) return null;

  return createPortal(
    <div className={styles.undoContainer}>
      <div className={styles.undoCard}>
        {children}
        <div className={styles.progressBar} />
      </div>
    </div>,
    document.body,
  );
};
