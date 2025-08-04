import { jsonServerApi } from '../../lib/axios';
import { Central } from '../../types/central/central';

interface GetCentralsParams {
  search?: string;
}

export const getCentrals = async (
  params?: GetCentralsParams,
): Promise<Central[]> => {
  const response = await jsonServerApi.get('/centrals', {
    params: params?.search ? { q: params.search } : undefined,
  });
  const centrals = response.data;

  return centrals;
};
