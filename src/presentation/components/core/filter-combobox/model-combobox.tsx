'use client';

import React, { FC, useEffect, useRef, useState } from 'react';

import { useModels } from '../../../hooks/use-models';
import { useFilterStore } from '../../../state/filter-store';
import { Model } from '../../../types/central/central';
import * as styles from './styles/filter-combobox.css';

interface ModelComboboxProps {
  availableModels?: Model[];
}

export const ModelCombobox: FC<ModelComboboxProps> = ({ availableModels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { data: allModels, isLoading } = useModels();
  const { selectedModels, toggleModel, setSelectedModels } = useFilterStore();

  const models = availableModels || allModels || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedModelsData = models.filter((model) =>
    selectedModels.includes(model.id),
  );

  const getDisplayText = () => {
    if (selectedModels.length === 0) {
      return 'Selecionar modelos...';
    }
    if (selectedModels.length === 1) {
      return selectedModelsData[0]?.name || 'Modelo selecionado';
    }
    return `${selectedModels.length} modelos selecionados`;
  };

  const handleToggleModel = (modelId: number) => {
    toggleModel(modelId);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModels([]);
  };

  const selectAllModels = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allModelIds = models.map((model) => model.id);
    setSelectedModels(allModelIds);
  };

  const deselectAllModels = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModels([]);
  };

  if (isLoading) {
    return (
      <div className={styles.filterGroup}>
        <div className={styles.filterLabel}>Modelos</div>
        <div className={styles.comboboxContainer}>
          <button className={styles.comboboxTrigger} disabled>
            <span className={styles.comboboxPlaceholder}>Carregando...</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterLabel}>
        Modelos (Multiseleção)
        {selectedModels.length > 0 && (
          <span className={styles.comboboxBadge}>{selectedModels.length}</span>
        )}
      </div>

      <div className={styles.comboboxContainer}>
        <button
          ref={triggerRef}
          className={styles.comboboxTrigger}
          onClick={() => setIsOpen(!isOpen)}
          type='button'
        >
          <span
            className={
              selectedModels.length === 0
                ? styles.comboboxPlaceholder
                : styles.comboboxTriggerText
            }
          >
            {getDisplayText()}
          </span>

          <div
            className={styles.filterGroup}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            {selectedModels.length > 0 && (
              <button
                onClick={clearSelection}
                className={styles.clearFiltersButton}
                style={{
                  padding: '2px 6px',
                  fontSize: '12px',
                  marginLeft: '8px',
                }}
                type='button'
              >
                ✕
              </button>
            )}
            <span
              className={isOpen ? styles.comboboxIconOpen : styles.comboboxIcon}
            >
              ▼
            </span>
          </div>
        </button>

        {isOpen && (
          <div ref={dropdownRef} className={styles.comboboxDropdown}>
            {models.length === 0 ? (
              <div className={styles.comboboxOption}>
                <span className={styles.comboboxPlaceholder}>
                  Nenhum modelo disponível
                </span>
              </div>
            ) : (
              <>
                <div
                  className={styles.comboboxOption}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    fontWeight: '600',
                    fontSize: '12px',
                    padding: '6px 12px',
                    cursor: 'default',
                  }}
                >
                  <span>
                    ✓ Clique nos checkboxes para selecionar múltiplos modelos
                  </span>
                </div>
                <div
                  className={styles.comboboxOption}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>
                      Ações em lote:
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={selectAllModels}
                        className={styles.clearFiltersButton}
                        style={{
                          padding: '4px 8px',
                          fontSize: '11px',
                          backgroundColor: 'rgba(0,255,0,0.1)',
                          color: 'var(--success)',
                          border: '1px solid var(--success)',
                        }}
                        type='button'
                      >
                        Selecionar Todos
                      </button>
                      <button
                        onClick={deselectAllModels}
                        className={styles.clearFiltersButton}
                        style={{
                          padding: '4px 8px',
                          fontSize: '11px',
                          backgroundColor: 'rgba(255,0,0,0.1)',
                          color: '#ff6b6b',
                          border: '1px solid #ff6b6b',
                        }}
                        type='button'
                      >
                        Desmarcar Todos
                      </button>
                    </div>
                  </div>
                </div>
                {models.map((model) => {
                  const isSelected = selectedModels.includes(model.id);

                  return (
                    <div
                      key={model.id}
                      className={
                        isSelected
                          ? styles.comboboxOptionSelected
                          : styles.comboboxOption
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModel(model.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <input
                        type='checkbox'
                        className={styles.comboboxCheckbox}
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleModel(model.id);
                        }}
                      />
                      <span>{model.name}</span>
                      {isSelected && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            color: 'var(--success)',
                            fontSize: '12px',
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
