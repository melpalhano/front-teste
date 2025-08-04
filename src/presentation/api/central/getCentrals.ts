import { jsonServerApi } from '../../lib/axios';
import { Central } from '../../types/central/central';

export const getCentrals = async (
): Promise<Central[]> => {
  const response = await jsonServerApi.get('/centrals');
  let centrals = response.data;

  return centrals;
};
