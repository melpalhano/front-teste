'use client';

import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { useFilterStore } from '../../../state/filter-store';
import { CentralWithModel } from '../../../types/central/central';
import * as styles from './styles/filter-combobox.css';

interface NameComboboxProps {
  data: CentralWithModel[];
}

export const NameCombobox: FC<NameComboboxProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { selectedModels, selectedNames, toggleName, setSelectedNames } =
    useFilterStore();

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

  const availableNames = useMemo(() => {
    if (selectedModels.length === 0) return [];

    const filteredCentrals = data.filter((central) =>
      selectedModels.includes(central.modelId),
    );

    const uniqueNames = [
      ...new Set(filteredCentrals.map((central) => central.name)),
    ];

    return uniqueNames.sort();
  }, [data, selectedModels]);

  const displayNames = useMemo(() => {
    if (selectedModels.length === 0) {
      return [];
    }
    return availableNames;
  }, [availableNames, selectedModels.length]);

  const isDisabled = selectedModels.length === 0;

  const getDisplayText = () => {
    if (isDisabled) {
      return 'Selecione modelos primeiro...';
    }
    if (selectedNames.length === 0) {
      return 'Selecionar centrais...';
    }
    if (selectedNames.length === 1) {
      return selectedNames[0];
    }
    return `${selectedNames.length} centrais selecionadas`;
  };

  const handleToggleName = (name: string) => {
    if (isDisabled) return;
    toggleName(name);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    setSelectedNames([]);
  };

  const selectAllNames = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    setSelectedNames(availableNames);
  };

  const deselectAllNames = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    setSelectedNames([]);
  };

  const handleTriggerClick = () => {
    if (isDisabled) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && !isDisabled) {
      // Monitor dropdown state
    }
  }, [isOpen, displayNames, selectedNames, availableNames, isDisabled]);

  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterLabel}>
        Centrais (Multiseleção)
        {selectedNames.length > 0 && (
          <span className={styles.comboboxBadge}>{selectedNames.length}</span>
        )}
      </div>

      <div className={styles.comboboxContainer}>
        <button
          ref={triggerRef}
          className={`${styles.comboboxTrigger} ${
            isDisabled ? styles.disabledCombobox : ''
          }`}
          onClick={handleTriggerClick}
          disabled={isDisabled}
          type='button'
        >
          <span
            className={
              selectedNames.length === 0 || isDisabled
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
            {selectedNames.length > 0 && !isDisabled && (
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
            {!isDisabled && (
              <span
                className={
                  isOpen ? styles.comboboxIconOpen : styles.comboboxIcon
                }
              >
                ▼
              </span>
            )}
          </div>
        </button>

        {isOpen && !isDisabled && (
          <div ref={dropdownRef} className={styles.comboboxDropdown}>
            {displayNames.length === 0 ? (
              <div className={styles.comboboxOption}>
                <span className={styles.comboboxPlaceholder}>
                  Nenhuma central disponível
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
                    ✓ Clique nos checkboxes para selecionar múltiplas centrais
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
                        onClick={selectAllNames}
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
                        Selecionar Todas
                      </button>
                      <button
                        onClick={deselectAllNames}
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
                        Desmarcar Todas
                      </button>
                    </div>
                  </div>
                </div>
                {displayNames.map((name: string) => {
                  const isSelected = selectedNames.includes(name);
                  const isAvailable = availableNames.includes(name);

                  return (
                    <div
                      key={name}
                      className={
                        isSelected
                          ? styles.comboboxOptionSelected
                          : styles.comboboxOption
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAvailable) {
                          handleToggleName(name);
                        }
                      }}
                      style={{
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        opacity: isAvailable ? 1 : 0.5,
                      }}
                    >
                      <input
                        type='checkbox'
                        className={styles.comboboxCheckbox}
                        checked={isSelected}
                        disabled={!isAvailable}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (isAvailable) {
                            handleToggleName(name);
                          }
                        }}
                      />
                      <span
                        style={{
                          color: isAvailable
                            ? 'inherit'
                            : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {name}
                        {!isAvailable && ' (não disponível)'}
                      </span>
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
