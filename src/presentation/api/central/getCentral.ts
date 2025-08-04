import { jsonServerApi } from '../../lib/axios';
import { Central } from '../../types/central/central';

export async function getCentral(id: number): Promise<Central> {
  const response = await jsonServerApi.get<Central>(`/centrals/${id}`);
  return response.data;
}
