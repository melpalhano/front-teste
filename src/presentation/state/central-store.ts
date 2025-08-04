import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CentralStore {
  totalCentrals: number;
  isLoading: boolean;
  setTotalCentrals: (total: number) => void;
  incrementTotal: () => void;
  decrementTotal: () => void;
  setLoading: (loading: boolean) => void;
}

export const useCentralStore = create<CentralStore>()(
  persist(
    (set, _get) => ({
      totalCentrals: 0,
      isLoading: false,
      setTotalCentrals: (total) => set({ totalCentrals: total }),
      incrementTotal: () =>
        set((state) => ({ totalCentrals: state.totalCentrals + 1 })),
      decrementTotal: () =>
        set((state) => ({
          totalCentrals: Math.max(0, state.totalCentrals - 1),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'central-store',
      partialize: (state) => ({ totalCentrals: state.totalCentrals }),
    },
  ),
);
