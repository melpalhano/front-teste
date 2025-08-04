'use client';

import { FC } from 'react';

import { useUndoStore } from '../../../state/undo-store';
import * as styles from './styles/undo-notification.css';

export const UndoNotificationContent: FC = () => {
  const { deletedCentral } = useUndoStore();

  if (!deletedCentral) return null;

  return (
    <div className={styles.undoContent}>
      <div className={styles.undoTitle}>Central excluída</div>
      <div className={styles.undoDescription}>
        {deletedCentral.name} foi removida
      </div>
    </div>
  );
};
