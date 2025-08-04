import { jsonServerApi } from '../../lib/axios';

export interface CheckMacExistsParams {
  mac: string;
}

export async function checkMacExists({
  mac,
}: CheckMacExistsParams): Promise<boolean> {
  try {
    const response = await jsonServerApi.get('/centrals', {
      params: {
        mac,
      },
    });

    return response.data && response.data.length > 0;
  } catch (error) {
    return false;
  }
}
