'use client';

import { FC } from 'react';

import { useUndoDelete } from '../../../hooks/use-undo-delete';
import * as styles from './styles/undo-notification.css';

export const UndoNotificationActions: FC = () => {
  const { handleUndo, handleDismiss, isRestoring } = useUndoDelete();

  return (
    <div className={styles.undoActions}>
      <button
        className={styles.undoButtonPrimary}
        onClick={handleUndo}
        disabled={isRestoring}
      >
        {isRestoring ? 'Restaurando...' : 'Desfazer'}
      </button>
      <button
        className={styles.undoButtonSecondary}
        onClick={handleDismiss}
        disabled={isRestoring}
      >
        Dispensar
      </button>
    </div>
  );
};
