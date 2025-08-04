import { jsonServerApi } from '../../lib/axios';
import { Central } from '../../types/central/central';

export interface UpdateCentralDto {
  name: string;
  mac: string;
  modelId: number;
}

export interface CentralUpdateResponse {
  message: string;
  central: Central;
}

export async function updateCentral(
  id: number,
  data: UpdateCentralDto,
): Promise<CentralUpdateResponse> {
  const response = await jsonServerApi.put<CentralUpdateResponse>(
    `/centrals/${id}`,
    data,
  );
  return response.data;
}
