'use client';

import { UndoNotificationActions } from './undo-notification-actions';
import { UndoNotificationContainer } from './undo-notification-container';
import { UndoNotificationContent } from './undo-notification-content';

export const UndoNotification = {
  Container: UndoNotificationContainer,
  Content: UndoNotificationContent,
  Actions: UndoNotificationActions,
};

export const UndoNotificationDefault = () => (
  <UndoNotification.Container>
    <UndoNotification.Content />
    <UndoNotification.Actions />
  </UndoNotification.Container>
);
