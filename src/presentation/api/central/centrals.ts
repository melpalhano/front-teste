import { jsonServerApi } from '../../lib/axios';
import { CentralWithModel } from '../../types/central/central';

interface GetCentralsParams {
  search?: string;
}

interface CentralsResponse {
  data: CentralWithModel[];
  total: number;
}

export async function getCentrals(
  params: GetCentralsParams,
): Promise<CentralsResponse> {
  const { search } = params;

  const [centralsResponse, modelsResponse] = await Promise.all([
    jsonServerApi.get('/centrals'),
    jsonServerApi.get('/models'),
  ]);

  const centrals = centralsResponse.data;
  const models = modelsResponse.data;

  let combinedData: CentralWithModel[] = centrals
    .map((central: any) => {
      const modelId = Number(central.modelId);
      const model = models.find((m: any) => Number(m.id) === modelId);

      return {
        ...central,
        id: Number(central.id),
        modelId,
        model: model ? { ...model, id: Number(model.id) } : null,
      };
    })
    .filter((central: any) => central.model !== null) as CentralWithModel[];

  if (search && search.trim()) {
    const searchLower = search.toLowerCase().trim();
    combinedData = combinedData.filter(
      (central) =>
        central.name.toLowerCase().includes(searchLower) ||
        central.model.name.toLowerCase().includes(searchLower),
    );
  }

  return {
    data: combinedData,
    total: combinedData.length,
  };
}
