'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createCentral } from '../../api/central/createNovaCentral';
import { Button } from '../../components/core/button';
import { Input } from '../../components/core/input';
import { Select } from '../../components/core/select';
import { QUERY_KEYS } from '../../constants/query-keys';
import { useCentralCounterSync } from '../../hooks/use-central-counter-sync';
import { useCheckMacExists } from '../../hooks/use-check-mac-exists';
import { useModels } from '../../hooks/use-models';
import {
  CreateCentralFormData,
  createCentralSchema,
} from '../../schemas/novaCentral.schema';
import { useCentralStore } from '../../state/central-store';
import * as styles from './styles/create-central-form.css';

export const CreateCentralForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: models, isLoading: isLoadingModels } = useModels();
  const [macValue, setMacValue] = useState('');
  const { data: macExists, isLoading: isCheckingMac } =
    useCheckMacExists(macValue);
  const { incrementTotal } = useCentralStore();
  const { syncCounter } = useCentralCounterSync();

  const { mutateAsync: createCentralFn, isPending: isCreating } = useMutation({
    mutationFn: createCentral,
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateCentralFormData>({
    resolver: zodResolver(createCentralSchema),
    defaultValues: {
      name: '',
      mac: '',
      modelId: '',
    },
  });

  const watchedMac = watch('mac');

  useEffect(() => {
    setMacValue(watchedMac);
  }, [watchedMac]);

  useEffect(() => {
    if (macExists && macValue) {
      setError('mac', {
        type: 'manual',
        message: 'Este endereço MAC já está em uso.',
      });
    } else if (macValue && !macExists) {
      clearErrors('mac');
    }
  }, [macExists, macValue, setError, clearErrors]);

  const onSubmit = async (data: CreateCentralFormData) => {
    if (macExists) {
      setError('mac', {
        type: 'manual',
        message: 'Este endereço MAC já está em uso.',
      });
      return;
    }

    try {
      await createCentralFn({
        name: data.name,
        mac: data.mac,
        modelId: Number(data.modelId),
      });

      incrementTotal();
      await syncCounter();

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CENTRALS],
      });

      router.push('/centrais');
    } catch (error) {
      console.error('Erro ao criar central:', error);
    }
  };

  const modelOptions =
    models?.map((model) => ({
      value: model.id.toString(),
      label: model.name,
    })) || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Nova Central</h1>
        <p className={styles.formDescription}>
          Preencha os dados abaixo para criar uma nova central.
        </p>
      </div>

      <div className={styles.formFields}>
        <Input
          label='Nome da Central'
          placeholder='Digite o nome da central'
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label='Endereço MAC'
          placeholder='XX:XX:XX:XX:XX:XX'
          error={errors.mac?.message}
          {...register('mac')}
        />

        <Select
          label='Modelo'
          placeholder='Selecione um modelo'
          options={modelOptions}
          error={errors.modelId?.message}
          disabled={isLoadingModels}
          {...register('modelId')}
        />
      </div>

      <div className={styles.formActions}>
        <Button
          type='button'
          variant='secondary'
          onClick={() => router.push('/centrais')}
          disabled={isCreating}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='primary'
          disabled={isCreating || isLoadingModels || isCheckingMac || macExists}
        >
          {isCreating ? 'Criando...' : 'Criar Central'}
        </Button>
      </div>
    </form>
  );
};
