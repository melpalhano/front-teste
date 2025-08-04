import { jsonServerApi } from '../../lib/axios';

export interface DeleteCentralParams {
  centralId: number;
}

export async function deleteCentral({ centralId }: DeleteCentralParams) {
  await jsonServerApi.delete(`/centrals/${String(centralId)}`);
}
