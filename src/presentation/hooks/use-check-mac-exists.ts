import { useQuery } from '@tanstack/react-query';

import { checkMacExists } from '../api/central/checkMacExists';

export function useCheckMacExists(mac: string) {
  return useQuery({
    queryKey: ['check-mac-exists', mac],
    queryFn: () => checkMacExists({ mac }),
    enabled: mac.length > 0 && /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(mac),
  });
}
