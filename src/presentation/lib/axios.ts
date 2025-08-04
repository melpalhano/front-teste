import axios from 'axios';

import { environment } from '../config/environment';

export const jsonServerApi = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (environment.NODE_ENV === 'development') {
  jsonServerApi.interceptors.request.use((config) => {
    return config;
  });

  jsonServerApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
