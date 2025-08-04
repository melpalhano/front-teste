import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface FilterState {
  selectedModels: number[];
  selectedNames: string[];
  isFiltersVisible: boolean;
}

interface FilterActions {
  setSelectedModels: (models: number[]) => void;
  toggleModel: (modelId: number) => void;
  setSelectedNames: (names: string[]) => void;
  toggleName: (name: string) => void;
  toggleFiltersVisibility: () => void;
  clearFilters: () => void;
  clearNames: () => void;
  syncFromSearchParams: (searchParams: URLSearchParams) => void;
  setUpdateSearchParamsFunction: (
    updateFn: (updateParams: (params: URLSearchParams) => void) => void,
  ) => void;
  updateSearchParams?: (
    updateParams: (params: URLSearchParams) => void,
  ) => void;
}

interface FilterStore extends FilterState, FilterActions {}

export const useFilterStore = create<FilterStore>()(
  subscribeWithSelector((set, get) => ({
    selectedModels: [],
    selectedNames: [],
    isFiltersVisible: false,

    setSelectedModels: (models: number[]) => {
      set({ selectedModels: models });
      const { updateSearchParams } = get();
      if (updateSearchParams) {
        updateSearchParams((params) => {
          params.delete('models');
          if (models.length > 0) {
            params.set('models', models.join(','));
          }
        });
      }
    },

    toggleModel: (modelId: number) => {
      const { selectedModels } = get();
      const newSelectedModels = selectedModels.includes(modelId)
        ? selectedModels.filter((id) => id !== modelId)
        : [...selectedModels, modelId];

      get().setSelectedModels(newSelectedModels);
    },

    setSelectedNames: (names: string[]) => {
      set({ selectedNames: names });
      const { updateSearchParams } = get();
      if (updateSearchParams) {
        updateSearchParams((params) => {
          params.delete('names');
          if (names.length > 0) {
            params.set('names', names.join(','));
          }
        });
      }
    },

    toggleName: (name: string) => {
      const { selectedNames } = get();
      const newSelectedNames = selectedNames.includes(name)
        ? selectedNames.filter((n) => n !== name)
        : [...selectedNames, name];

      get().setSelectedNames(newSelectedNames);
    },

    toggleFiltersVisibility: () => {
      set((state) => ({ isFiltersVisible: !state.isFiltersVisible }));
    },

    clearFilters: () => {
      set({ selectedModels: [], selectedNames: [] });
      const { updateSearchParams } = get();
      if (updateSearchParams) {
        updateSearchParams((params) => {
          params.delete('models');
          params.delete('names');
        });
      }
    },

    clearNames: () => {
      set({ selectedNames: [] });
      const { updateSearchParams } = get();
      if (updateSearchParams) {
        updateSearchParams((params) => {
          params.delete('names');
        });
      }
    },

    syncFromSearchParams: (searchParams: URLSearchParams) => {
      const modelsParam = searchParams.get('models');
      const namesParam = searchParams.get('names');

      const selectedModels = modelsParam
        ? modelsParam.split(',').map(Number).filter(Boolean)
        : [];

      const selectedNames = namesParam
        ? namesParam.split(',').filter(Boolean)
        : [];

      set({
        selectedModels,
        selectedNames,
      });
    },

    setUpdateSearchParamsFunction: (
      updateFn: (updateParams: (params: URLSearchParams) => void) => void,
    ) => {
      set({ updateSearchParams: updateFn });
    },
  })),
);

export const useFilteredData = () => {
  const { selectedModels, selectedNames } = useFilterStore();

  return {
    hasActiveFilters: selectedModels.length > 0 || selectedNames.length > 0,
    selectedModels,
    selectedNames,
  };
};
