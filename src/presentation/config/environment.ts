interface EnvironmentConfig {
  API_BASE_URL: string;
  JSON_SERVER_PORT: string;
  NODE_ENV: string;
}

export const environment: EnvironmentConfig = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  JSON_SERVER_PORT: process.env.NEXT_PUBLIC_JSON_SERVER_PORT ?? '',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

export const validateEnvironment = () => {
  const requiredVars = ['NEXT_PUBLIC_API_BASE_URL'];

  for (const varName of requiredVars) {
    if (!process.env[varName] && environment.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};

export const getApiConfig = () => {
  return {
    baseURL: environment.API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
