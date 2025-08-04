import * as z from 'zod';

export const createCentralSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Nome deve ter pelo menos 3 caracteres.',
    })
    .max(100, {
      message: 'Nome deve ter no máximo 100 caracteres.',
    }),
  mac: z.string().regex(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/, {
    message: 'MAC deve estar no formato XX:XX:XX:XX:XX:XX',
  }),
  modelId: z.string().min(1, {
    message: 'Modelo é obrigatório.',
  }),
});

export type CreateCentralFormData = z.infer<typeof createCentralSchema>;
