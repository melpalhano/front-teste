'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateCentral } from '../../api/central/updateCentral';
import { Button } from '../../components/core/button';
import { Input } from '../../components/core/input';
import { Select } from '../../components/core/select';
import { QUERY_KEYS } from '../../constants/query-keys';
import { useCentralCounterSync } from '../../hooks/use-central-counter-sync';
import { useCheckMacExists } from '../../hooks/use-check-mac-exists';
import { useModels } from '../../hooks/use-models';
import { useCentral } from '../../queries';
import {
  CreateCentralFormData,
  createCentralSchema,
} from '../../schemas/novaCentral.schema';
import * as styles from './styles/create-central-form.css';

interface EditCentralFormProps {
  centralId: number;
}

export const EditCentralForm = ({ centralId }: EditCentralFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: central, isLoading: isLoadingCentral } = useCentral(centralId);
  const { data: models, isLoading: isLoadingModels } = useModels();
  const [macValue, setMacValue] = useState('');
  const { data: macExists, isLoading: isCheckingMac } =
    useCheckMacExists(macValue);
  const { syncCounter } = useCentralCounterSync();

  const { mutateAsync: updateCentralFn, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateCentral(id, data),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<CreateCentralFormData>({
    resolver: zodResolver(createCentralSchema),
    defaultValues: {
      name: '',
      mac: '',
      modelId: '',
    },
  });

  // Preenche o formulário com os dados da central quando carregados
  useEffect(() => {
    if (central) {
      setValue('name', central.name);
      setValue('mac', central.mac);
      setValue('modelId', central.modelId.toString());
      setMacValue(central.mac);
    }
  }, [central, setValue]);

  const watchedMac = watch('mac');

  useEffect(() => {
    setMacValue(watchedMac);
  }, [watchedMac]);

  useEffect(() => {
    if (macExists && macValue && macValue !== central?.mac) {
      setError('mac', {
        type: 'manual',
        message: 'Este endereço MAC já está em uso.',
      });
    } else if (macValue && !macExists) {
      clearErrors('mac');
    }
  }, [macExists, macValue, setError, clearErrors, central?.mac]);

  const onSubmit = async (data: CreateCentralFormData) => {
    if (macExists && macValue !== central?.mac) {
      setError('mac', {
        type: 'manual',
        message: 'Este endereço MAC já está em uso.',
      });
      return;
    }

    try {
      await updateCentralFn({
        id: centralId,
        data: {
          name: data.name,
          mac: data.mac,
          modelId: Number(data.modelId),
        },
      });

      await syncCounter();

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CENTRALS],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CENTRAL, centralId],
      });

      router.push('/centrais');
    } catch (error) {
      console.error('Erro ao atualizar central:', error);
    }
  };

  const modelOptions =
    models?.map((model) => ({
      value: model.id.toString(),
      label: model.name,
    })) || [];

  if (isLoadingCentral) {
    return <div>Carregando dados da central...</div>;
  }

  if (!central) {
    return <div>Central não encontrada</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Editar Central</h1>
        <p className={styles.formDescription}>
          Edite os dados da central abaixo.
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
          disabled={isUpdating}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='primary'
          disabled={isUpdating || isLoadingModels || isCheckingMac || (macExists && macValue !== central?.mac)}
        >
          {isUpdating ? 'Atualizando...' : 'Atualizar Central'}
        </Button>
      </div>
    </form>
  );
};
