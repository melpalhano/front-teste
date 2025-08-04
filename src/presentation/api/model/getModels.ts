import { jsonServerApi } from '../../lib/axios';
import { Model } from '../../types/central/central';

export const getModels = async (): Promise<Model[]> => {
  const response = await jsonServerApi.get('/models');
  return response.data;
};
