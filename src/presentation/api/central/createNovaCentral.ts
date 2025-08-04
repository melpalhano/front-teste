import { jsonServerApi } from '../../lib/axios';

export interface CreateCentralBody {
  name: string;
  mac: string;
  modelId: number;
}

export async function createCentral({ name, mac, modelId }: CreateCentralBody) {
  const randomId = Math.floor(Math.random() * 9000) + 1000;
  const response = await jsonServerApi.post('/centrals', {
    id: randomId,
    name,
    mac,
    modelId,
  });

  return response.data;
}
