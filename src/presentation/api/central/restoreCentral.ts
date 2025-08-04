import { jsonServerApi } from '../../lib/axios';
import { CentralWithModel } from '../../types/central/central';

export interface RestoreCentralParams {
  central: CentralWithModel;
}

export async function restoreCentral({ central }: RestoreCentralParams) {
  const centralData = {
    id: central.id,
    name: central.name,
    mac: central.mac,
    modelId: central.modelId,
  };

  const response = await jsonServerApi.post('/centrals', centralData);
  return response.data;
}
