export interface Model {
  id: number;
  name: string;
}

export interface Central {
  id: number;
  name: string;
  modelId: number;
  mac: string;
}

export interface CentralWithModel extends Central {
  model: Model;
}

export interface CentralsResponse {
  data: CentralWithModel[];
  total: number;
  page: number;
  limit: number;
}
