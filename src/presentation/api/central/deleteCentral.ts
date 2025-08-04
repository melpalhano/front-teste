import { jsonServerApi } from '../../lib/axios';

export interface DeleteCentralParams {
  centralId: string;
}

export async function deleteCentral({ centralId }: DeleteCentralParams) {
  await jsonServerApi.delete(`/centrals/${centralId}`);
}
