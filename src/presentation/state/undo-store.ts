import { create } from 'zustand';

import { CentralWithModel } from '../types/central/central';

interface UndoState {
  isVisible: boolean;
  deletedCentral: CentralWithModel | null;
  timeoutId: ReturnType<typeof setTimeout> | null;
}

interface UndoActions {
  showUndoNotification: (central: CentralWithModel) => void;
  hideUndoNotification: () => void;
  clearTimeout: () => void;
}

interface UndoStore extends UndoState, UndoActions {}

export const useUndoStore = create<UndoStore>((set, get) => ({
  isVisible: false,
  deletedCentral: null,
  timeoutId: null,

  showUndoNotification: (central: CentralWithModel) => {
    const { clearTimeout } = get();

    clearTimeout();

    const timeoutId = setTimeout(() => {
      set({ isVisible: false, deletedCentral: null, timeoutId: null });
    }, 5000);

    set({
      isVisible: true,
      deletedCentral: central,
      timeoutId,
    });
  },

  hideUndoNotification: () => {
    const { clearTimeout } = get();
    clearTimeout();
    set({ isVisible: false, deletedCentral: null, timeoutId: null });
  },

  clearTimeout: () => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
      set({ timeoutId: null });
    }
  },
}));
